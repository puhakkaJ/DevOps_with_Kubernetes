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

  
    setTimeout(getRandomString, 5000)
}
  
getRandomString()