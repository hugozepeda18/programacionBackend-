import fs from 'fs'
//const fs = require('fs')

class contenedorProducto{

    
    constructor(){
        try{
            this.productos = JSON.parse(fs.readFileSync('./src/server/db/productos.json'))
        }catch(err){
            console.log("Products list is empty, generating list")
            this.productos = []
            return
        }
    }
    getProduct = async (id) => {
        let producto = await this.productos.find(prod => prod.id == id)
        if(!producto){
            console.log("Product not existent")
            
        }

        return producto
    }

    addProduct = async (newProd) => {
        console.log("Adding new product")
        newProd.timestamp = Date.now()
        this.productos.push(newProd)
        let res = await this.saveProductsList(this.productos)
        if (res){
            console.log("Error while saving file")
            return 3
        }
        return 0
        
    }
    
    
    delProduct = async (id) => {
        console.log("Removing product")
        let newProducts = await this.productos.filter(prod => prod.id != id)
        if (JSON.stringify(newProducts) == JSON.stringify(this.productos)){
            console.log("Product not existent")
            return 1
        }
        this.productos = newProducts
        console.log("Saving new list to memory")
        let res = await this.saveProductsList(this.productos)
        if (res){
            console.log("Error while saving file")
            return 3
        }
        return 0
    }
    
    updateProduct = async (id, newProd)=> {
        console.log("Updating product")
        let idx = await this.productos.findIndex(prod => prod.id == id)
        if(idx == -1){
            console.log("Product is not existent, add a new product instead")
            return 1
        }
        newProd.id = id
        this.productos[idx] = newProd
        console.log("Saving new list to memory")
        let res = await this.saveProductsList(this.productos)
        if (res){
            console.log("Error while saving file")
            return 3
        }
        return 0
    }

    getAllProd = async () => {
        console.log("Retrieving all products")
        try{
            this.productos = JSON.parse(fs.readFileSync('./src/server/db/productos.json'))
        }catch(err){
            console.log("Products list is empty, generating list")
            this.productos = []
            return 1
        }
        return this.productos
      }
    
    saveProductsList = async (products)=> {
        let parsed = await JSON.stringify(products)
        try {
            await fs.promises.writeFile('./src/server/db/productos.json', parsed, 'utf-8')
        }catch(err){
            console.log("unable to save products in file system")
            return 1
        }
        console.log("File saved succesfully")
        return 0
    }

}


export default new contenedorProducto()
//let con = new contenedorProducto()
//con.getProduct(1).then(prod => console.log(prod))
//con.updateProduct(1, {"nombre":"JI"})
//con.addProduct({"nombre":"HA"})
//con.delProduct(1)