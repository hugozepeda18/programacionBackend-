// ACERCAMIENTO
//console.log(process.env)

const MODO = process.env.MODO || 'prod'
const PUERTO = process.env.PUERTO || 1
const DEBUG = process.env.DEBUG || true

console.log({ MODO, PUERTO, DEBUG})