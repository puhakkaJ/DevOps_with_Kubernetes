const express = require('express')
const fetch = require('node-fetch');

var app = express()

const url = process.env.WEBSITE_URL
const PORT = 3000;

app.get('/', function(req, res) {
  fetch(url)
    .then(res => res.text())
    .then(body => res.send(body));
})

app.listen(PORT, () => {
  console.log(`Server started in port ${port}`)
})