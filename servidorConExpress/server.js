const Contenedor = require("./Contenedor.js")

const cont1 = new Contenedor();

const express = require('express')

const app = express()

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/', (req, res) => {
    res.send('Bienvenido al Desafío: Servidor con Express')
})

app.get('/productos', (req, res) => {
    res.send(cont1.getAll())
})

let max = 3
app.get('/productoRandom', (req, res) => {
    res.send(cont1.getById(Math.floor(Math.random() * max) + 1))
})