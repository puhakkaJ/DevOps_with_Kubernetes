const Koa = require('koa')
const path = require('path')
const fs = require('fs')

const app = new Koa()
const directory = path.join('/', 'usr', 'src', 'app', 'files')
const filePath = path.join(directory, 'timestamp.text')

const PORT = process.env.PORT || 3001

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


const findAFile = async () => {
    const content = getRandomString();
    console.log(content)
    await fs.writeFile(filePath, content, err => {
        if (err) {
            console.error(err);
        };
    });

    setTimeout(findAFile, 5000) 
}
  
findAFile()

console.log(`Server started in port ${PORT}`)
app.listen(PORT)
  