const express = require("express")
const compression = require('compression')
const cookieParser = require ('cookie-parser')
const path = require("path")
const session = require('express-session')
const { Router } = express
const router = Router()

//SELF
const passport = require("../autenticacion/passport")
const logger = require('../loggers/loggers')

//RUTA INFO
const directoryName = path.basename(__dirname);
const PID = process.pid
const version = process.version
const os = process.platform
const memCheck = process.memoryUsage().rss
const dir = process.cwd()
const title = process.title
const numCPUs = require('os').cpus().length

//.env
const sessionAlive = process.env.TIEMPO
const sessionWord = process.env.PALABRA

router.use(cookieParser())
router.use(
    session({
        secret: sessionWord,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: parseInt(sessionAlive),
        }
    })
)

router.use(passport.initialize())
router.use(passport.session())

//ROUTES
router.get('/registrar', (req, res) => {
    logger.logInfo.info('/registrar')
    res.render('register')
})

router.post('/registrar', passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/signup-error'
}))

router.get('/login', (req, res) => {
    logger.logInfo.info('/login')
    res.render('login')
})

router.get('/', (req, res) => {
    logger.logInfo.info('/login')
    res.render('login')
})

router.post('/login', passport.authenticate('login', {
    successRedirect: '/datos',
    failureRedirect: '/login-error'
}))

router.get('/login-error', (req, res) => {
    logger.logInfo.info('/login-error')
    res.render('login-error')
})

router.get('/signup-error', (req, res) => {
    logger.logInfo.info('/signup-error')
    res.render('signup-error')
})

router.get('/logout', (req, res) => {
    logger.logInfo.info('/logout')
    req.session.destroy()
    res.redirect('login')
})

router.get('/datos', (req, res) => {
    logger.logInfo.info('/datos')
    const { email, password } = req.user
    res.render('datos', {email})
})

router.get('/info', (req, res) => {
    logger.logInfo.info('/info')
    res.render('info', {directoryName, PID, version, os, memCheck, dir, title, numCPUs})
})

// DESAFIO -> Ruta con console.log
router.get('/info-log', (req, res) => {
    logger.logInfo.info('/info')
    logger.logInfo.info(
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
router.get('/info-compress', compression(), (req, res) => { 
    logger.logInfo.info('/info-compress')
    res.render('info', {directoryName, PID, version, os, memCheck, dir, title, numCPUs})
})

module.exports = router