const axios = require('axios')

axios.get("https://en.wikipedia.org/wiki/Special:Random").then(res => {
  const article = "https://en.wikipedia.org" + res.request.path
  axios.post("http://todo-application-back-svc:2346/todos", 
    {new: "Read " + article}
  )
});
