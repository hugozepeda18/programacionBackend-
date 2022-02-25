class Contenedor {
    static id = 0
    constructor(fileName) {
        this.fs = require('fs')
        this.objects = []
        let beginPath = './'
        let endPath = '.txt'
        this.path = beginPath + fileName + endPath
        try {
            if (this.fs.existsSync(this.path)) {
                console.log('File already exists! You can write now')
            } else {
                this.escribir(this.path,[])
                console.log('File created')
            }
        } catch(err) {
            console.error(err)
        }
    }

    async escribir(ruta, contenido) {
        try {
            await this.fs.promises.writeFile(ruta,JSON.stringify(contenido))
        } catch(err) { 
            console.log("Error de escritura!", err)
        }
    }

    save(object) {
        if(Contenedor.id == 0){
            Contenedor.id++
            object.id = Contenedor.id;
            this.objects.push(object)
            this.escribir(this.path, this.objects)
        } else {
            Contenedor.id++
            object.id = Contenedor.id;
            this.objects.push(object)
            this.escribir(this.path,this.objects)
        }
        return Contenedor.id
    }

    getById(number) {
        console.log("Selected id is: " + number)
        for (let i = 0; i < this.objects.length; i++) {
            let obj = Object.values(this.objects)[i]
            if(obj[Object.keys(obj)[3]] == number){
                console.log('Title: ' + obj[Object.keys(obj)[0]])
                console.log('Price: ' + obj[Object.keys(obj)[1]])
                console.log('Thumbail: ' + obj[Object.keys(obj)[2]])
                return obj
            }
        }
    }

    getAll() {
        return this.objects
    }

    deleteById(number) {
        console.log("Selected id to erase: " + number)
        let newObjects = []
        for (let i = 0; i < this.objects.length; i++) {
            let obj = Object.values(this.objects)[i]
            if(obj[Object.keys(obj)[3]] != number){
                newObjects.push(obj)
            }
        }
        this.objects = newObjects
        this.escribir(this.path,this.objects)
    }

    deleteAll() {
        console.log('Errasing File')
        this.fs.writeFile(this.path, '', function(){console.log('done')})
        this.objects = []
        Contenedor.id = 0
    }
}

module.exports = Contenedor

