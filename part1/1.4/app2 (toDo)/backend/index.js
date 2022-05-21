const http = require('http')
const express = require('express')
const axios = require('axios')
const path = require('path')
const fs = require('fs')

const dir = path.join('/', 'usr', 'app', 'files')
const filePath = path.join(dir, "image.jpg")

const PORT = process.env.PORT || 8080

const app = express()
const server = http.createServer(app)

app.use(express.static('build'))

app.get('/dailyImage', async (req, res) => {
  res.sendFile(filePath)
})

app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')))

const fetchImage = async () => {
  const writer = fs.createWriteStream(filePath)
  const response = await axios.get('https://picsum.photos/1200', {
    responseType: 'stream'
  })
  response.data.pipe(writer)

  setTimeout(fetchImage, 86400000);
}

fetchImage();

server.listen(PORT, "0.0.0.0", () => {console.log(`Server started in port ${PORT}`) })