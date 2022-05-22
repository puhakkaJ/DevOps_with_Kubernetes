const http = require('http')
const express = require('express')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
var cors = require('cors')
const bodyParser = require('body-parser');


const PORT = process.env.PORT || 5050

const app = express()
app.use(bodyParser.json());
app.use(cors())

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'image.jpg')

let todos = ["TODO1"]

const fileAlreadyExists = async () => new Promise(res => {
  fs.stat(filePath, (err, stats) => {
    if (err || !stats) return res(false)
    return res(true)
  })
})

const fetchImage = async () => {
  await new Promise(res => fs.mkdir(directory, (err) => res()))
  const response = await axios.get('https://picsum.photos/1200', {
    responseType: 'stream'
  })
  response.data.pipe(fs.createWriteStream(filePath))

  setTimeout(fetchImage, 86400000);
}

fetchImage();

app.get('/image', async (req, res) => {
  if (!(fileAlreadyExists)) {await fetchImage()}
  res.sendFile(filePath)
})

app.get('/todos', async (req, res) => {
  res.json(todos)
})

app.post('/todos', async (req, res) => {
  console.log(req.body.new)
  todos.push(req.body.new)
  res.sendStatus(200);
})


app.listen(PORT, () => {console.log(`Server started in port ${PORT}`) })