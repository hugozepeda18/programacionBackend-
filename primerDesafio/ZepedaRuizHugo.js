class Usuario {
    constructor(nombre, apellido, libro, mascotas) {
        if(typeof nombre === 'string' && typeof apellido === 'string' && typeof libro === 'object' && Array.isArray(mascotas)){
            this.nombre = nombre;
            this.apellido = apellido;
            this.libro = libro;
            this.mascotas = mascotas;
        } else {
            throw ('Plese provide correct data types, nombre and apellido are strings. Libro is object and mascotas is an array of strings.')
        }
    }

    getFullName() {
        return `Full name is: ${this.nombre} ${this.apellido}`
    }

    addMascota(nombreMascota){
        this.mascotas.push(nombreMascota)
    }

    countMascotas(){
        return this.mascotas.length
    }

    addBook(nombre, autor){
        let libro = {}
        libro.Nombre = nombre
        libro.Autor = autor
        this.libro.push(libro)
    }

    getBookNames(){
        let books = []
        for (let i = 0; i < this.libro.length; i++) {
            let obj = Object.values(this.libro)[i]
            books.push(obj[Object.keys(obj)[0]])
        }
        return books
    }
}

let primerLibro = [{
    Nombre : 'Harry Potter',
    Autor : 'JK Rowling'
}]
let mascotas = ['perro']
const usuario = new Usuario('Hugo', 'Zepeda', primerLibro, mascotas)
console.log(usuario.getFullName())
usuario.addMascota('gato')
console.log(usuario.countMascotas())
usuario.addBook('Cracking the code interview', 'McDowell')
usuario.addBook('Algorithms', 'Ronald Rivest')
console.log(usuario.getBookNames())
