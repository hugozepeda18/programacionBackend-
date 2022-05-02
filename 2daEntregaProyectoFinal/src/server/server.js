import express from 'express'
import productRouter from './routes/productos.js'
import carritoRouter from './routes/carrito.js'

const PORT = 8080
let app = express()


app.use(express.json())

app.use('/api/productos', productRouter)
app.use('/api/carrito', carritoRouter)

app.use((req, res, next) => {
    let metodo = req.method
    let ruta = req.path
    res.send({error: -2, descripcion: `ruta ${ruta}, metodo ${metodo} no implementada`}, 404)
})

app.listen(PORT, () => {
    console.log("express running")
})

