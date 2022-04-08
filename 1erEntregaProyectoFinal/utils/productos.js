import fs from 'fs'

class Productos{
    constructor(){
        try{
            this.productos = JSON.parse(fs.readFileSync('./persistencia/productos.json'))
        }catch(err){
            console.log("Products list is empty, generating list")
            this.productos = []
            return
        }    
    }

    save2File(products){
        let parsed = JSON.stringify(products)
        try{
            fs.writeFile('./persistencia/productos.json', parsed, 'utf-8')
        }catch(err){
            console.log("unable to save products in file system")
            return 1
        }
        console.log("Products saved successfully")
        return 0
    }

    add(newProd){
        console.log("Adding new product")
        try{
            var currIdx = this.productos.slice(-1)[0].id
        } catch(err){
            console.log("Products list is empty, generating id")
            currIdx = 0
        }
        
        newProd.id = currIdx + 1
        newProd.timestamp = Date.now()
        this.productos.push(newProd)
        let res = this.save2File(this.productos)
        if (res){
            console.log("Error while saving file")
            return 3
        }
        return 0
    }

    get(id){
        let prod = this.productos.find(prod => prod.id == id)
        if(!prod){
            console.log("Product does not exist")
        }
        return prod
    }

    getAll(){
        return this.productos
    }

    remove(id){
        console.log(`Removing product with ID ${id}`)
        let newProducts = this.productos.filter(prod => prod.id != id)
        if (JSON.stringify(newProducts) == JSON.stringify(this.productos)){
            console.log("Product does not exist")
            return 1
        }
        this.productos = newProducts
        let res = this.save2File(this.productos)
        if (res){
            console.log("Error while saving file")
            return 3
        }
        return 0
    }

    update(id, knownProduct){
        console.log("Updating product")
        let idx = this.productos.findIndex(prod => prod.id == id)
        if(idx == -1){
            console.log("Product does not exist, add a new product instead")
            return 1
        }
        knownProduct.id = id
        this.productos[idx] = knownProduct
        let res = this.save2File(this.productos)
        if (res){
            console.log("Error while saving file")
            return 3
        }
        return 0
    }

}

module.exports = new Productos()
