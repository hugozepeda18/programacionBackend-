const express = require('express')
const app = express()
app.listen(8080, () => console.log('servidor levantado'))
const nombres = ['Luis', 'Lucía', 'Juan', 'Augusto', 'Ana']
const apellidos = ['Pieres', 'Cacurri', 'Bezzola', 'Alberca', 'Mei']
const colores = ['rojo', 'verde', 'azul', 'amarillo', 'magenta']
let elemento = {}
let datos = []

function devolverElemento() {
    elemento = {}
    elemento.nombres = nombres[Math.floor(Math.random() * 5)]
    elemento.apellidos = apellidos[Math.floor(Math.random() * 5)]
    elemento.colores = colores[Math.floor(Math.random() * 5)]
    return elemento
}
app.get('/test', (req, res) => {
    datos = []
    for (let i = 0; i < 10; i++) {
        datos.push(devolverElemento())
    }
    console.log(datos)
    res.send(datos)
})