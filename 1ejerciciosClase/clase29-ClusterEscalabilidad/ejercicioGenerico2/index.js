const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

console.log('Número de CPUs: ' + numCPUs)

if(cluster.isPrimary){
    console.log(`Master ${process.pid} is running`)
    for(let i = 0; i < numCPUs; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        cluster.fork()
        console.log(`worker ${worker.process.pid} died`)
    })    
} else {
    http.createServer((req, res) => {
        console.log(`proceso corriendo ${process.pid}`)
        res.writeHead(200)
        res.end('hello world')
    }).listen(8000)
}
console.log(`worker ${process.pid} is running`)