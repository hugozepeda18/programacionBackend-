import express from 'express'
import path from 'path'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import cluster from 'cluster'
import os from 'os'
import dotenv from 'dotenv'
import handlebars from 'express-handlebars'
import parseArgs from 'minimist'

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

import {} from './utils/passportConfig.js'
import productRouter from './routes/productos.js'
import carritoRouter from './routes/carrito.js'

import processRouter from './routes/processRouter.js'
import userRouter from './routes/userRouter.js'
import homeRouter from './routes/homeRouter.js'
import logger from './loggers/loggers.js'

const options = {alias: {p: 'puerto'}, default: {puerto: '8080'}}
const PORT = parseArgs(process.argv.slice(2), options)

const opt = {alias: {m: 'modo'}, default: {modo: 'FORK'}}
const MODO = parseArgs(process.argv.slice(3), opt)

logger.logInfo.info(`Puerto seleccionado: ${PORT.puerto}`)
logger.logInfo.info(`Modo seleccionado: ${MODO.modo}`)


if(MODO.modo === 'CLUSTER' && cluster.isPrimary){
    const numCPUs = os.cpus().length
    logger.logInfo.info(`CPUs son: ${numCPUs}`)
    logger.logInfo.info(`Modo: ${MODO.modo}`)
    logger.logInfo.info(`PID MASTER ${process.pid}`)
    for(let i =0; i<numCPUs; i++){
        cluster.fork()
    }
    cluster.on('exit', (worker) =>{
        logger.logInfo.info(
            'worker',
            worker.process.pid,
            'died',
            new Date().toLocaleString()
        )
        cluster.fork()
    })
}
else{
    logger.logInfo.info(`Modo: ${MODO.modo}`)
    const app = express()
    
    app.use(express.urlencoded({extended:false}))
    app.use(express.json())

    app.set("views", path.join(__dirname, 'views'));

    const hbs = handlebars.create({
        extname: ".hbs",
        defaultLayout: "main.hbs",
        layoutsDir: './src/views/layouts'
    });

    app.engine('hbs', hbs.engine);
    app.set("view engine", "hbs");    

    app.use(cookieParser())
    app.use(session({
        secret: process.env.PALABRA,
        resave: true,
        rolling: true,
        saveUninitialized: false,
        cookie: {
            maxAge: parseInt(process.env.TIEMPO),
            sameSite: false
        },
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use('/api/productos', productRouter)
    app.use('/api/carrito', carritoRouter)
    app.use("/api/user", userRouter)
    app.use("/api", processRouter)
    app.use("", homeRouter)

    app.listen(PORT.puerto,() => {
        logger.logInfo.info("Servidor corriendo")
    })
}
