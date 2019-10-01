const http = require('http')
const interval = 1000
const period = 10000
const date = new Date
const dateTime = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}`

const app = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    const setId = setInterval(()=>{ console.log(dateTime) }, interval)
    setTimeout(() => { 
        clearInterval(setId)
        res.end(dateTime);
    }, period)
    
});

app.listen('3002', function () {
    console.log('listen port 3002')
})