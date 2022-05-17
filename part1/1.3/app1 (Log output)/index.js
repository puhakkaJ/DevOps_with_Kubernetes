const Koa = require('koa')
const koaRouter = require('koa-router')

const app = new Koa()
const router = new koaRouter()

const PORT = process.env.PORT || 3000

const randomString = Math.random().toString(36).substr(2, 15)

const getRandomString = () => {
    let date_ob = new Date();
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
    context.status = 200
    context.body = getRandomString()
})
  
app.use(router.routes())
    .use(router.allowedMethods())
  
setTimeout(getRandomString, 5000)

console.log(`Server started in port ${PORT}`)
app.listen(PORT)
  