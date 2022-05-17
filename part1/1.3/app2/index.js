const Koa = require('koa')
const koaRouter = require('koa-router')

const app = new Koa()
const router = new koaRouter()

const PORT = process.env.PORT || 3000


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
  context.body = "Welcome to my Koa.js Server"
})

app.use(router.routes())
  .use(router.allowedMethods())


console.log(`Server started in port ${PORT}`)
app.listen(PORT)