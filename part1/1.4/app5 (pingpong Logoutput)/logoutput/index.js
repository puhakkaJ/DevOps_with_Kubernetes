const Koa = require('koa')
const koaRouter = require('koa-router')

const app = new Koa()
const router = new koaRouter()

const path = require('path')
const fs = require('fs')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'pingpong.text')

const PORT = process.env.PORT || 3000

const randomString = Math.random().toString(36).substr(2, 15)

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
    return (year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds + ": " + randomString);  
}

app.use( async (ctx, next) => {
    try {
      await next()
    } catch(err) {
      console.log(err.status)
      ctx.status = err.status || 500;
      ctx.body = err.message;
    }
})
  
router.get('home', '/', (context) => {
  try {  
    var data = fs.readFileSync(filePath, 'utf8');
    console.log(data.toString());    
    context.body = `${getRandomString()} \nPing / Pongs: ${data}`
  } catch(e) {
    console.log('Error:', e.stack);
  }
})
  
app.use(router.routes())
    .use(router.allowedMethods())
  
setTimeout(getRandomString, 5000)

console.log(`Server started in port ${PORT}`)
app.listen(PORT)
  