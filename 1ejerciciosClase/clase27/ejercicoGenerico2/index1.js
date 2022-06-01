require('dotenv').config()

const FRENTE = process.env.FRENTE || 'azul'
const FONDO = process.env.FONDO || 'amarillo'

console.log({ FRENTE, FONDO})