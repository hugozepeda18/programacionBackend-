import logger from '../loggers/loggers.js'
import express from 'express'
import os from 'os'

var router = express.Router()

router.get('/home', (req, res)=> {
    const user = req.user
    if(!user){
        logger.logInfo.info("Usuario no loggeado")
        res.redirect('/login')
    }
    else{
        logger.logInfo.info("Usuario loggeado")
        res.render('logged', {email: user.name})
    }
})

router.get('/login', (req, res) => {
    req.logOut((err) => {
        if(err){logger.logError.error(err)}
    })
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.get('/', (req, res) => {
    res.render('register')
})

router.post('/logout', (req, res) => {
    const name = req.user.name
    req.logOut((err) => {
        if(err){
            res.render('logoutErr')
        }
        else{
            res.render('logout', {name: name})
        }
    })
    
})

router.get('/info', (req, res) => {
    const PID = process.pid
    const version = process.version
    const plataforma = process.platform
    const memCheck = process.memoryUsage().rss
    const dir = process.cwd()
    const title = process.title
    const args = process.argv
    const numCPUs = os.cpus().length

    logger.logInfo.info(
        `Número de proceso: ${PID}
         Versión de node: ${version}
         Sistema Operativo: ${os}
         Memoria: ${memCheck}
         Directorio: ${dir}
         Título: ${title}
         Número de CPU: ${numCPUs}
         Argumentos: ${args}`)

    res.render('info', {PID, version, plataforma, memCheck, dir, title, numCPUs, args})

})

router.get("/register/error", (req, res) => {
    res.render('signupErr')
})

router.get("/login/error", (req, res) => {
    res.render('loginErr')
})

export default router