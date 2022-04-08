const fs = require("fs")

class carrito {
    constructor(){
        try{
            this.shoppingCar = JSON.parse(fs.readFileSync('./persistencia/carrito.json'))
        }catch(err){
            console.log("Shopping car list is empty, generating list")
            this.shoppingCar = []
            return
        }
    }

    save2File(carritos){
        let parsed = JSON.stringify(carritos)
        try{
            fs.writeFile('./persistencia/carrito.json', parsed, 'utf-8')
        }catch(err){
            console.log("Unable to save products in file system")
            return 1
        }
        console.log("Carritos saved successfully")
        return 0
    }

    add(){
        console.log("Adding new shopping car")
        let newCarrito = {
            "id": null,
            "timestamp": Date.now(),
            "products": []
        }
        try{
            var currCarrito = this.shoppingCar.slice(-1)[0].id
        } catch(err){
            console.log("Cars list is empty, generating id")
            currCarrito = 0
        }
        newCarrito.id = currCarrito + 1
        this.shoppingCar.push(newCarrito)
        let res = this.save2File(this.shoppingCar)
        if (res){
            console.log("Error while saving file")
        }
        return newCarrito.id
    }

    remove(id){
        console.log("Removing Shopping car")
        let newCarrito = this.shoppingCar.filter(car => car.id != id)
        if (JSON.stringify(newCarrito) == JSON.stringify(this.shoppingCar)){
            console.log("Carrito does not exist")
            return 1
        }
        this.shoppingCar = newCarrito
        let res = this.saveCarsList(this.shoppingCar)
        if (res){
            console.log("Error while saving file")
            return 3
        }
        return 0
    }

    get(id){
        let carrito = this.shoppingCar.find(car => car.id == id)
        if(!carrito){
            console.log("Shopping Car not created yet")
            return carrito
        }

        return carrito.products
    }

    addProduct(id, product){
        console.log(`Adding new product to carrito ID ${id}`)
        let carrito = this.shoppingCar.find(car => car.id == id)
        if(!carrito){
            console.log("Shopping Car not created yet")
            return 1
        }
        try{
            var currProd = carrito.products.slice(-1)[0].id
        } catch(err){
            console.log("Cars Products list is empty, generating id")
            currProd = 0
        }
        product.id = currProd + 1
        carrito.products.push(product)

        let res = this.save2File(this.shoppingCar)
        if (res){
            console.log("Error while saving file")
            return 3
        }
        return 0
    }

    removeProduct(id, idProduct){
        console.log("Removing product")
        let carrito = this.shoppingCar.find(car => car.id == idCar)

        if(!carrito){
           console.log("Shopping Car not created yet")
           return 1
        }
        let filteredProds = carrito.products.filter(prod => prod.id != idProd)

        if (JSON.stringify(filteredProds) == JSON.stringify(carrito.products)){
            console.log("Product not existent")
            return 1
        }
        carrito.products = filteredProds
        let res = this.save2File(this.shoppingCar)
        if (res){
            console.log("Error while saving file")
            return 3
        }
        return 0
    }

}