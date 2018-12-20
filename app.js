const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000

app.use('/media', express.static('media'))
app.use('/scripts', express.static('scripts'))

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: true
}))

app.get('/replace', (req, res) => {
  if (!req.query.xss) {
      req.query.xss = ''
  }

  let xss = req.query.xss.replace(/<script>|<\/script>/g, 'NAUGHTY_HACKER')
  res.send(`<html><head></head><body><strong>Usage: ?xss=&lt;script&gt;alert(1)&lt;/script&gt;</strong><div>${xss}</div></body></html>`)
})

app.get('/remove', (req, res) => {
  if (!req.query.xss) {
    req.query.xss = ''
  }

  let xss = req.query.xss.replace(/<script>|<\/script>|onerror/g, '')
  res.send(`<html><head></head><body><strong>Usage: ?xss=&lt;script&gt;alert(1)&lt;/script&gt;</strong><div>${xss}</div></body></html>`)
})

app.get('/', (req, res) => {
  if (!req.query.xss) {
    req.query.xss = ''
  }

  res.send(`<html><head></head><body><strong>Usage: ?xss=&lt;script&gt;alert(1)&lt;/script&gt;</strong><div>${req.query.xss}</div></body></html>`)
})

app.post('/keylogger', (req, res) => {
  console.log('Key press: ' + req.body.data)
  res.send('')
})

app.post('/screenshot', (req, res) => {
  let offsetToData = 22 // Offset of where the image starts after data:image/png;base64,
  let data = Buffer.from(req.body.data.substring(offsetToData), 'base64')

  fs.writeFile('screenshot.png', data, function (error) {
    if (error) {
      console.log('Failed to save screenshot')
    } else {
      console.log('Saved screenshot')
    }
  })

  res.send('Logged')
})

app.listen(port, () => console.log(`Listening on port ${port}`))
