const Contenedor = require("./Contenedor.js")

const file = new Contenedor('productos');

objeto = {
    title: 'Escuadra',
    price: 123.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png'
}
console.log('Recent added object has id:' + file.save(objeto))

objeto1 = {
    title: 'Calculadora',
    price: 234.45,
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png'
}

console.log('Recent added object has id:' + file.save(objeto1))


objeto2 = {
    title: 'Globo Terráqueo',                                                                                                                          
    price: 345.67,                                                                                                                                     
    thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png'
}

console.log('Recent added object has id:' + file.save(objeto2))


const objects = file.getAll()
console.log("TODOS LOS OBJETOS>>>>>>")
for (let i = 0; i < objects.length; i++) {
    let obj = Object.values(objects)[i]
    console.log('Title: ' + obj[Object.keys(obj)[0]])
    console.log('Price: ' + obj[Object.keys(obj)[1]])
    console.log('Thumbail: ' + obj[Object.keys(obj)[2]])
    console.log('Id: ' + obj[Object.keys(obj)[3]])
}

console.log("OBJETO 3>>>>>>")
file.getById(3)

file.deleteById(2)

console.log("TODOS LOS OBJETOS>>>>>>")
const objects1 = file.getAll()
for (let i = 0; i < objects1.length; i++) {
    let obj = Object.values(objects1)[i]
    console.log('Title: ' + obj[Object.keys(obj)[0]])
    console.log('Price: ' + obj[Object.keys(obj)[1]])
    console.log('Thumbail: ' + obj[Object.keys(obj)[2]])
    console.log('Id: ' + obj[Object.keys(obj)[3]])
}
