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


const { Pool, Client } = require("pg");
console.log(process.env.POSTGRES_PASSWORD)
const pool = new Pool({
  user: "kubeuser",
  host: "postgres-svc",
  database: "pingpong",
  password: process.env.POSTGRES_PASSWORD,
  port: "5432"
});

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

app.get('/todos', async (req, result) => {
  pool.query(
    "SELECT text FROM todo",
    (err, res) => {
      console.log(err, res);
      let todos1 = res.rows
      let todos = []
      todos1.forEach(todo => {
        todos.push(todo.text)
      });
      result.json(todos)
    }
  );
  
})

app.post('/todos', async (req, result) => {
  if (req.body.new.length < 141) {
    pool.query(
      `INSERT INTO todo VALUES ('${req.body.new}')`,
      (err, res) => {
        console.log(req.body.new);
        
        result.sendStatus(200);
      }
    );
  } else {
    console.log("Your sent TODO is too long. Limit is 140 characters!")
  }
})


app.listen(PORT, () => {console.log(`Server started in port ${PORT}`) })