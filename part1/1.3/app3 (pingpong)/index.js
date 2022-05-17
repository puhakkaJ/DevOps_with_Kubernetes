const Koa = require('koa')
const koaRouter = require('koa-router')

const app = new Koa()
const router = new koaRouter()

const PORT = process.env.PORT || 3000

let number = 0


app.use( async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    console.log(err.status)
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
})

router.get('pingpong', '/pingpong', (context) => {
  context.status = 200
  context.body = `pong ${number}`
  number = number + 1
})

app.use(router.routes())
  .use(router.allowedMethods())


app.listen(PORT)