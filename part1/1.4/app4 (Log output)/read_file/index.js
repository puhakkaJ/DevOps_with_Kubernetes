const Koa = require('koa')
const path = require('path')
const fs = require('fs')

const app = new Koa()
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'timestamp.text')

const PORT = process.env.PORT || 3000


const getFile = async () => new Promise(res => {
  fs.readFile(filePath, (err, buffer) => {
    if (err) return console.log('FAILED TO READ FILE', '----------------', err)
    res(buffer)
  })
})

app.use(async ctx => {
 
  try {  
    var data = fs.readFileSync(filePath, 'utf8');
    console.log(data.toString());    
    ctx.body = data
  } catch(e) {
    console.log('Error:', e.stack);
  }
});


console.log(`Second server started in port ${PORT}`)
app.listen(PORT)
  