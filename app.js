const express = require('express')
const fs = require('fs')
const app = express()

let html = ''

app.use('/public', express.static('public'))
app.use('/config', express.static('config'))
app.use('/articles', express.static('articles'))

app.get('/', (req, res) => {
  fs.readFile('./index.html', 'utf-8', (err, data)=>{
    html = data
    return res.end(html)
  })
})

const server = app.listen(3000, function () {
  console.log('app is running at http://localhost:%s', server.address().port)
})