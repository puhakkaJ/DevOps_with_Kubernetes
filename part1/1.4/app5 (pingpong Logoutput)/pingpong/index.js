const Koa = require('koa')
const koaRouter = require('koa-router')

const app = new Koa()
const router = new koaRouter()

const path = require('path')
const fs = require('fs')

const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'pingpong.text')


const PORT = process.env.PORT || 3001

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
  number = number + 1
  let num = `${number}`
  console.log(number)

  fs.writeFile(filePath, num, err => {
    if (err) {
        console.error(err);
    };
  });
  context.status = 200
  context.body = `pong ${number}`
})

app.use(router.routes())
  .use(router.allowedMethods())


app.listen(PORT)