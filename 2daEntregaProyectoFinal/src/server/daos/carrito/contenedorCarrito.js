import fs from 'fs'
//const fs = require('fs')
//TODO ADD TIMESTAM AND REQUIRED CAR STRUCTURE
class contenedorCarritos{
    
    constructor(){
        try{
            this.shoppingCar = JSON.parse(fs.readFileSync('./src/server/db/carrito.json'))
        }catch(err){
            console.log("Shopping car list is empty, generating list")
            this.shoppingCar = []
            return
        }
    }

    addShoppingCar = async () => {
        console.log("Adding new shopping car")
        let newCar = {
            "id": null,
            "timestamp": Date.now(),
            "products": []
        }
        try{
            var currCar = await this.shoppingCar.slice(-1)[0].id
        } catch(err){
            console.log("Cars list is empty, generating id")
            currCar = 0
        }
        newCar.id = currCar + 1
        this.shoppingCar.push(newCar)
        let res = await this.saveCarsList(this.shoppingCar)
        if (res){
            console.log("Error while saving file")
            return null
        }
        return newCar.id
    }
    
    delShoppingCar = async (id) => {
        console.log("Removing Shopping car")
        let newCars = await this.shoppingCar.filter(car => car.id != id)
        if (JSON.stringify(newCars) == JSON.stringify(this.shoppingCar)){
            console.log("Car does not exist")
            return 1
        }
        this.shoppingCar = newCars
        console.log("Saving new list to memory")
        let res = await this.saveCarsList(this.shoppingCar)
        if (res){
            console.log("Error while saving file")
            return 3
        }
        return 0
    }

    getProdsInCar = async (id) => {
        let car = await this.shoppingCar.find(car => car.id == id)
        if(!car){
            console.log("Shopping Car not created yet")
            return car
        }
        //console.log(car.products)
        return car.products
    }
    
    addProduct = async (id, newProd) => {
        console.log("Adding new product to Car")
        let car = await this.shoppingCar.find(car => car.id == id)
        if(!car){
            console.log("Shopping Car not created yet")
            return 1
        }
        try{
            var currProd = await car.products.slice(-1)[0].id
        } catch(err){
            console.log("Cars Products list is empty, generating id")
            currProd = 0
        }
        newProd.id = currProd + 1
        car.products.push(newProd)

        let res = await this.saveCarsList(this.shoppingCar)
        if (res){
            console.log("Error while saving file")
            return 3
        }
        return 0
        
    }
    
    
    delProduct = async (idCar, idProd) => {
        console.log("Removing product")
        let car = await this.shoppingCar.find(car => car.id == idCar)

        if(!car){
           console.log("Shopping Car not created yet")
           return 1
        }
        let filteredProds = car.products.filter(prod => prod.id != idProd)

        if (JSON.stringify(filteredProds) == JSON.stringify(car.products)){
            console.log("Product not existent")
            return 1
        }
        car.products = filteredProds
        console.log("Saving new list to memory")
        let res = await this.saveCarsList(this.shoppingCar)
        if (res){
            console.log("Error while saving file")
            return 3
        }
        return 0
    }
    
    saveCarsList = async (cars)=> {
        let parsed = await JSON.stringify(cars)
        try {
            await fs.promises.writeFile('./src/server/db/carrito.json', parsed, 'utf-8')
        }catch(err){
            console.log("unable to save products in file system")
            return 1
        }
        console.log("File saved succesfully")
        return 0
    }

}


export default new contenedorCarritos()
/* let con = new contenedorCarritos();
(async () => {

    await con.addShoppingCar()
    await con.addShoppingCar()
    await con.delShoppingCar(3)
    await con.getProdsInCar(2)
    await con.addProduct(2, {"id":1, "name":"dasdw"})
    await con.getProdsInCar(2)
    await con.delProduct(2,1)
    await con.getProdsInCar(2)
})(); */
//con.getProduct(1).then(prod => console.log(prod))
//con.updateProduct(1, {"nombre":"JI"})
//con.addProduct({"nombre":"HA"})
//con.delProduct(1)