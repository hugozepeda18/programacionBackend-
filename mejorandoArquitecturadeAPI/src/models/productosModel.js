import mongoose from 'mongoose'

const productosCollection = "productos"

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true},
    id: {type: String, required: true},
    precio: {type: String, required: true},
    descripcion: { type: String},
    codigo: { type: String, required: true },
    url: { type: String},
    stock: {type: Number, required: true},
    timestamp: {type: String, required: true}
})
const producto = mongoose.model(productosCollection, productoSchema)

export {productoSchema, producto}