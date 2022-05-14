import faker from 'faker'
faker.locale = 'es'
const { name, internet, random, vehicle } = faker

import express from 'express'
const app = express()
app.listen(8080, () => console.log('Servidor levantado'))

let elemento = {}
let datos = []

function devolverElemento(indice) {
    elemento = {}
    elemento.id = indice
    elemento.nombres = name.firstName()
    elemento.apellidos = name.lastName()
    elemento.colores = vehicle.color()
    return elemento
}
app.get('/test', (req, res) => {
    datos = []
    let cantDatos
    req.query.cant ? (cantDatos = req.query.cant) : (cantDatos = 10)

    for (let i = 0; i < cantDatos; i++) {
        datos.push(devolverElemento(i + 1))
    }

    res.send(datos)
})