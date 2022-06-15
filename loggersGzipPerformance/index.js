
const express = require('express')
const session = require('express-session')
const cookieParser = require ('cookie-parser')
const handlebars = require('express-handlebars')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const path = require("path")
const bcrypt = require('bcryptjs');
const parseArgs = require('minimist')
require('dotenv').config()
const apiRouter = require("./api")
//DESAFIO
const compression = require('compression')
const log4js = require('log4js')

log4js.configure({
    appenders: {
        myLoggerConsole: {type: 'console'},
        myWarnFile: {type: 'file', filename: './loggers/warn.log'},
        myErrorFile: {type: 'file', filename: './loggers/error.log'}
    },
    categories: {
        default: {appenders: ['myLoggerConsole'], level: 'info'},
        logWarn: {appenders: ['myWarnFile'], level: 'warn'},
        logError: {appenders: ['myErrorFile'], level: 'error'}
    }
})

const logInfo = log4js.getLogger('default')
const logWarning = log4js.getLogger('logWarn')
const logError = log4js.getLogger('logError')

const cluster = require('cluster')
const opt = {alias: {m: 'modo'}, default: {modo: 'FORK'}}
const MODO = parseArgs(process.argv.slice(3), opt)

const numCPUs = require('os').cpus().length

const options = {alias: {p: 'puerto'}, default: {puerto: '8080'}}
const PORT = parseArgs(process.argv.slice(2), options)

const directoryName = path.basename(__dirname);
const PID = process.pid
const version = process.version
const os = process.platform
const memCheck = process.memoryUsage().rss
const dir = process.cwd()
const title = process.title

const sessionAlive = process.env.TIEMPO
const sessionWord = process.env.PALABRA

const usuarios = []

//MÓDULO NATIVO CLUSTER
if(MODO.modo === 'CLUSTER' && cluster.isPrimary){
    console.log(`Número de procesadores: ${numCPUs}`)
    console.log(`PID MASTER ${process.pid}`)

    for(let i = 0; i < numCPUs; i++){
        cluster.fork()
    }

    cluster.on('exit', (worker) => {
        console.log('Worker ',worker.process.pid, ' died ', new Date().toLocaleString())
        cluster.fork()
    })
    
}else{
    console.log(`MODO: ${MODO.modo}`)
    const app = express()

    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.use("/api", apiRouter)

    app.use(cookieParser())
    app.use(
        session({
            secret: sessionWord,
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: parseInt(sessionAlive),
            }
        })
    )

    app.use(passport.initialize())
    app.use(passport.session())

    //STRATEGY
    passport.use('register', 
        new LocalStrategy(
            { passReqToCallback: true },
            (req, username, password, done) => {
                const existe = usuarios.find( usuario => usuario.email === username)
                if(existe){
                    console.log('User exits')
                    return done(null, false)
                } else {
                    bcrypt.hash(password, 10).then(hash => {
                        console.log(hash)
                        usuarios.push({email: username, password: hash})
                        done(null, {email: username})
                    })
                }
            }
        )
    )

    passport.use('login', 
        new LocalStrategy(
            (username, password, done) => {
                const existe = usuarios.find( usuario => {
                    if(!bcrypt.compare(usuario.password, password)){return done(null, false)}
                    return usuario.email === username 
                }) 
                console.log(existe)
                if(!existe){
                    return done(null, false)
                } else {
                    console.log('Logged')
                    return done(null, existe)
                }
            }
        )
    )

    passport.serializeUser((usuario, done) => {
        console.log(usuario.email + ' serializado')
        done(null, usuario.email)
    })

    passport.deserializeUser((username, done) => {
        const usuarioDZ = usuarios.find( usuario => usuario.email === username)
        console.log(JSON.stringify(usuarioDZ) + ' deserializado')
        done(null, usuarioDZ)
    })

    //TEMPLATE
    app.set("views", path.join(__dirname, 'views'))

    const hbs = handlebars.create({
        extname: ".hbs",
        defaultLayout: "main.hbs",
        layoutsDir: './views/layouts'
    });

    app.engine('hbs', hbs.engine);
    app.set('view engine', 'hbs');

    //ROUTES
    app.get('/registrar', (req, res) => {
        logInfo.info('/registrar')
        res.render('register')
    })

    app.post('/registrar', passport.authenticate('register', {
        successRedirect: '/login',
        failureRedirect: '/signup-error'
    }))

    app.get('/login', (req, res) => {
        logInfo.info('/login')
        res.render('login')
    })

    app.post('/login', passport.authenticate('login', {
        successRedirect: '/datos',
        failureRedirect: '/login-error'
    }))

    app.get('/login-error', (req, res) => {
        logInfo.info('/login-error')
        res.render('login-error')
    })

    app.get('/signup-error', (req, res) => {
        logInfo.info('/signup-error')
        res.render('signup-error')
    })

    app.get('/logout', (req, res) => {
        logInfo.info('/logout')
        req.session.destroy()
        res.redirect('login')
    })

    app.get('/datos', (req, res) => {
        logInfo.info('/datos')
        const { email, password } = req.user
        res.render('datos', {email})
    })

    app.get('/info', (req, res) => {
        logInfo.info('/info')
        res.render('info', {directoryName, PID, version, os, memCheck, dir, title, numCPUs})
    })

    // DESAFIO -> Ruta con console.log
    app.get('/info-log', (req, res) => {
        logInfo.info('/info')
        console.log(
            `Nombre del directorio: ${directoryName}
             Número de procesa: ${PID}
             Versión de node: ${version}
             Sistema Operativo: ${os}
             Memoria: ${memCheck}
             Directorio: ${dir}
             Título: ${title}
             Número de CPU: ${numCPUs}`)
        res.render('info', {directoryName, PID, version, os, memCheck, dir, title, numCPUs})
    })

    // DESAFIO -> Agregué una ruta para comparar los beneficios de la compresión
    app.get('/info-compress', compression(), (req, res) => { 
        logInfo.info('/info-compress')
        res.render('info', {directoryName, PID, version, os, memCheck, dir, title, numCPUs})
    })

    //DESAFIO -> Ruta de peticiones a rutas inexistentes
    app.use((req,res) => {
        logWarning.warn('Ruta incorrecta/inexistente')
        logInfo.warn('Ruta incorrecta/inexistente')
        res.send('Ruta incorrecta/inexistente')
    })
  
    //SERVER
    app.listen(PORT.puerto, () => {
        console.log('Server up')
    })
}


