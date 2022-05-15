const Koa = require('koa')
const app = new Koa()
const PORT = process.env.PORT || 3000

app.use(async ctx => {
  if (ctx.path.includes('favicon.ico')) return
});


console.log(`Server started in port ${PORT}`)
app.listen(PORT)