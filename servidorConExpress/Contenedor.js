class Contenedor {
    constructor() {
        this.fs = require('fs')
        this.objects = [
            {
              "title": "Escuadra",
              "price": 123.45,
              "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
              "id": 1
            },
            {
              "title": "Calculadora",
              "price": 234.56,
              "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
              "id": 2
            },
            {
              "title": "Globo Terráqueo",
              "price": 345.67,
              "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
              "id": 3
            }
        ]
        this.objectsString = []
        this.leer()
    }

    async leer(){
        try{
            const contenido = await this.fs.promises.readFile("./servidorConExpress/productos.txt", "utf-8")
            this.objectsString = contenido
        } catch(err){
            console.log("Error de lectura " , err)
        }
    }

    getById(number) {
        console.log("Selected id is: " + number)
        for (let i = 0; i < this.objects.length; i++) {
            let obj = Object.values(this.objects)[i]
            if(obj[Object.keys(obj)[3]] == number){
                return JSON.stringify(obj)
            }
        }
    }

    getAll() {
        return this.objectsString
    }

}

module.exports = Contenedor

