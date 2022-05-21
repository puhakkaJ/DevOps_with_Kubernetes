const http = require('http')
const express = require('express')
const axios = require('axios')

const app = express()

const PORT = process.env.PORT || 3001

let number = 0


app.get('/pingpong',async (req, res) => {
  number = number + 1
  let num = `${number}`
  console.log(number)

  res.send(num)
})


app.listen(PORT, "0.0.0.0", () => {console.log(`Server started in port ${PORT}`) })