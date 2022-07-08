const express = require('express')
const handlebars = require('express-handlebars')
const path = require("path")
const parseArgs = require('minimist')
require('dotenv').config()
const logger = require('./loggers/loggers')

//ROUTES
const randomRouter = require("./routes/randomRouter")
const userRouter = require("./routes/userRouter")

const cluster = require('cluster')
const opt = {alias: {m: 'modo'}, default: {modo: 'FORK'}}
const MODO = parseArgs(process.argv.slice(3), opt)

const numCPUs = require('os').cpus().length

const options = {alias: {p: 'puerto'}, default: {puerto: '8080'}}
const PORT = parseArgs(process.argv.slice(2), options)



if(MODO.modo === 'CLUSTER' && cluster.isPrimary){
    logger.logInfo.info(`Número de procesadores: ${numCPUs}`)
    logger.logInfo.info(`PID MASTER ${process.pid}`)

    for(let i = 0; i < numCPUs; i++){
        cluster.fork()
    }

    cluster.on('exit', (worker) => {
        logger.logInfo.info('Worker ' + worker.process.pid + ' died' + new Date().toLocaleString())
        cluster.fork()
    })
    
}else{
    logger.logInfo.info(`MODO: ${MODO.modo}`)
    logger.logInfo.info(`PORT: ${PORT.puerto}`)
    const app = express()

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.use("/api", randomRouter)
    app.use("/", userRouter)    

    app.set("views", path.join(__dirname, 'views'))

    const hbs = handlebars.create({
        extname: ".hbs",
        defaultLayout: "main.hbs",
        layoutsDir: './views/layouts'
    });

    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');

    app.listen(PORT.puerto, () => {
        logger.logInfo.info('Server up')
    })
}


