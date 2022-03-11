const express = require('express')
const app = express()
const PORT = 8080

app.use(express.static('public'))

const server = app.listen(PORT, () => {
    console.log('servidor levantado en el puerto: ' + server.address().port)
})

server.on('error', (error) => console.log(`hubo un error ${error}`))

const productos = []

const routerProductos = express.Router()

routerProductos.use(express.urlencoded({ extended: true }))

routerProductos.use(express.json())

routerProductos.get('/api/productos', (req, res) => {
    res.json(productos)
})

routerProductos.get('/api/productos/:id', (req, res) => {
    res.json(productos)
})

routerProductos.put('/api/productos/:id', (req, res) => {
    res.json(productos)
})
  
routerProductos.post('/api/productos', (req, res) => {
    console.log(req.body)
    productos.push(req.body)
    res.json({ mensaje: 'se agrego correctamente' })
})

app.use('/api/productos', routerProductos)