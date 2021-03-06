const cluster = require('cluster')
const http = require('http')
const numCPUs = require('os').cpus().length

console.log(numCPUs)

if(cluster.isPrimary){
    console.log(`Master ${process.pid} is running`)
    for(let i = 0; i < numCPUs; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })    
} else {
    http.createServer((req, res) => {
        console.log(`proceso corriendo ${process.pid}`)
        res.writeHead(200)
        res.end('hello world')
    }).listen(8000)
}

//PROCESOS DE NODE JS ACTIVOS: tasklist /fi "imagename eq node.exe"
//MATAR PROCESOS: taskkill /pid <PID> /f 