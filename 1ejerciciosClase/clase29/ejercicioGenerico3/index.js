const cluster = require('cluster')
const http = require('http')
const PORT = process.argv[2] || 8080

http.createServer((req, res) => {
    console.log(`proceso corriendo ${process.pid} y puerto ${PORT}`)
    res.writeHead(200)
    res.end(`servido con PID: ${process.pid} y puerto ${PORT}`)
}).listen(PORT)

console.log(`worker ${process.pid} is running`)

//TODO: Checkout how to enable the script execution with forever
