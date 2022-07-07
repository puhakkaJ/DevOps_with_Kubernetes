const http = require('http')
const express = require('express')
const axios = require('axios')

const app = express()


const PORT = process.env.PORT || 8080

const randomString = Math.random().toString(36).substr(2, 15)
let string = ""

const getRandomString = () => {
    let date_ob_String = new Date().toLocaleString('en-US', { timeZone: 'Europe/Helsinki' });
    let date_ob = new Date(date_ob_String);
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + ": " + randomString);
    string = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + ": " + randomString
    
    setTimeout(getRandomString, 5000);

}

const getPongs = async () => {
  const res = await axios.get("http://pingpong-dep.devops-with-kubernetes.svc.cluster.local:2345/pingpong")
  return res.data
}

  
app.get('/', async (req, res) => {
  console.log("moikkkkaaaa")
  const pongs = await getPongs() 
  res.send(`
    <div>${process.env.MESSAGE}</div>
    <div>${string}</div>
    <div>Ping / Pongs: ${pongs}</div>
  `)
})

app.get('/healthz', async (req, res) => {
  const response = await axios.get("http://pingpong-dep.devops-with-kubernetes.svc.cluster.local:2345/healthz")
  if (response.status === 200) {
    res.sendStatus(200)
  } else {
    res.sendStatus(500)
  }
})

getRandomString();  

app.listen(PORT, "0.0.0.0", () => {console.log(`Server started in port ${PORT}`) })
  