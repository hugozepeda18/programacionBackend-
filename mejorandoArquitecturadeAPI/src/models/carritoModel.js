import mongoose from 'mongoose'
const carritoCollection = "carritos"
const carritoSchema = new mongoose.Schema({
    id: {type: String, required: true},
    timestamp: {type: String, required: true},
    products: [{
        nombre: { type: String, required: true},
        id: {type: String, required: true},
        precio: {type: String, required: true},
        descripcion: { type: String},
        codigo: { type: String, required: true },
        url: { type: String},
        stock: {type: Number, required: true},
        timestamp: {type: String, required: true},
        _id: mongoose.Schema.Types.ObjectId,
        __v: Number
        }
    ]
})
export const carrito = mongoose.model(carritoCollection, carritoSchema)


