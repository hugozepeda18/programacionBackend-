const express = require('express')
const winston = require('winston')
const app = express()

const ENT = 'PROD'

let logger

if(ENT === 'PROD'){
    logger = winston.createLogger({
        transports: [
            new winston.transports.File({ filename: 'error.log', level: 'error'}),
            new winston.transports.File({ filename: 'info.log', level: 'info'})
        ]
    })
}else{

}

app.get('/suma', (req, res) => {
    if(isNaN(req.query.val1) || isNaN(req.query.val2)){
        logger.log('error', 'parametros invalidos')
        res.send('Error datos')
    }else{
        logger.log('info', 'procesamiento exitoso')
        res.send({ resultado: parseInt(req.query.val1) + parseInt(req.query.val2)})
    }
})

app.use((req,res) => {
    logger.log('warn', 'ruta incorrecta')
    res.send('ruta incorrecta')
})

const PORT = 8080
app.listen(PORT, (err) => {
    if(!err)
        console.log('Server up')
})