const http = require('http')
const express = require('express')
const axios = require('axios')

const app = express()

const PORT = process.env.PORT || 3001

const { Pool, Client } = require("pg");
console.log(process.env.POSTGRES_PASSWORD)
const pool = new Pool({
  user: "kubeuser",
  host: "postgres-svc",
  database: "pingpong",
  password: process.env.POSTGRES_PASSWORD,
  port: "5432"
});


app.get('/pingpong',async (req, result) => {
  console.log("here")
  pool.query(
    "SELECT number FROM pp WHERE latest=true",
    (err, res) => {
      console.log(err, res);
      let number = parseInt(res.rows[0].number)
      number = number + 1
      let num = `${number}`
      console.log(number)
      pool.query(
        `UPDATE pp SET number=${number} WHERE latest=true`,
        (err, res) => {
          console.log(err, res);
        }
      );
      result.send(num)
    }
  );

  
})


app.listen(PORT, "0.0.0.0", () => {console.log(`Server started in port ${PORT}`) })