const express = require('express')
const log4js = require('log4js')
const app = express()

const ENT = 'DEV'

if(ENT === 'PROD'){
    log4js.configure({
        appenders: {
            miLoggerFile: {type: 'file', filename: 'debug.log'},
            miErrorFile: {type: 'file', filename: 'error.log'}
        },
        categories: {
            default: { appenders: ['miLoggerFile'], level: 'all'},
            logwn: {appenders: ['miErrorFile'], level: 'warn'},
            logInfo: {appenders: ['miLoggerFile'], level: 'info'}
        }
    })
}else{
    log4js.configure({
        appenders: {
            miLoggerConsole: {type: 'console'},
        },
        categories: {
            default: { appenders: ['miLoggerConsole'], level: 'all'},
            logwn: {appenders: ['miLoggerConsole'], level: 'warn'},
            logInfo: {appenders: ['miLoggerConsole'], level: 'info'}
        }
    })
}

const logWarning = log4js.getLogger('logwn')
const logInfo = log4js.getLogger('logInfo')

app.get('/suma', (req, res) => {
    if(isNaN(req.query.val1) || isNaN(req.query.val2)){
        logWarning.error('Error de datos, un dato no es un número')
        res.send('Error datos')
    }else{
        logInfo.info('Procesamiento exitoso')
        res.send({ resultado: parseInt(req.query.val1) + parseInt(req.query.val2)})
    }
})

const PORT = 8080
app.listen(PORT, (err) => {
    if(!err)
        console.log('Server up')
})