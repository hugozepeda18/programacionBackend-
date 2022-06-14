const express = require('express')
const app = express()
const compression = require('compression')

app.get('/saludo', (req, res) => {
    let msg = 'hola que tal'
    res.send(msg.repeat(1000))
})

app.get('/saludogzip', compression(), (req,res) => {
    let msg = 'hola que tal'
    res.send(msg.repeat(1000))
})

const PORT = 8080
app.listen(PORT, (err) => {
    if(!err)
        console.log('Server up')
})