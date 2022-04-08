const express = require("express")
const productContainer = require("./utils/productos")
const carritoContainer = require("./utils/carrito")

const administrador = true;

const { Router } = express

const router = Router()

router.get("/", (req, res)=>{
    if(administrador){
        res.send("Welcome Administrator")
    } else {
        res.send("Welcome Shopping!!!")
    }
})

router.get("/productos", (req, res)=>{
    const productos = productContainer.getAll()
    if(!productos){
        res.status(500).send({"Error": "No Products available"}).end()
        return
    }
    return res.send(productos)
})

router.get("/productos/:id", (req, res)=> {
    const id = parseInt(req.params.id)

    const producto = productContainer.get(id)

    if(!producto){
        res.status(500).send({"Error": `No product with ID ${id}`}).end()
        return
    }
    return res.send(producto)
})

router.get("/carrito/:id/productos", (req, res)=> {
    const id = parseInt(req.params.id)

    const carrito = carritoContainer.get(id)

    if(!producto){
        res.status(500).send({"Error": `No carrito with ID ${id}`}).end()
        return
    }
    return res.send(carrito)
})

router.post("/productos", (req, res)=> {
    if(administrador){
        const producto = req.body
        const newProd = productContainer.add(producto)
        if(newProd == 3){
            return res.status(500).send({message: "Product not added"});
        }
        return res.status(201).send({message: "Product added", id: newProd.id});

    } else {
        res.status(400).send({"Error": -1, "Descripcion": "ruta /productos método POST no autorizada"}).end()
        return
    }
    
})

router.post("/carrito", (req, res)=> {
    let carrito = carritoContainer.add()

    if(carrito == 3){
        console.warn("Shopping car File is not saved") 
    }
    return res.status(201).send({message: "Carrito created", id: carrito})

})

router.post("/carrito/:id/productos/:idProd", (req, res) => {
    let idCar = req.params.id
    let idProd = req.params.idProd

    let newProd = productContainer.getProduct(idProd)
    if(!newProd){
        res.status(204).send({message: "Product does not exists"})
    }
    let carrito = carritoContainer.addProduct(idCar, newProd)
    if(resContainer){
        return res.status(204).send({message: "Shopping Car not found"});
    }
    else if(resContainer == 3){
        console.log("Error while saving file")
    }
    return res.status(201).send({message: "Shopping car updated"});
})

router.put("/productos/:id", (req, res)=> {
    if(administrador){
        const id = parseInt(req.params.id)
        const product = req.body

        const updatedProd = productContainer.update(id, product)

        if(updatedProd){
            return res.status(204).send({message: "Product not found"});
        }
        else if(updatedProd == 3){
            console.log("Error while saving file")
        }
        return res.status(201).send({message: "Product updated"});
    } else {
        res.status(400).send({"Error": -1, "Descripcion": "ruta /productos/:id método PUT no autorizada"}).end()
        return
    }
    
})

router.delete("/productos/:id", (req, res)=> {
    if(administrador){
        const id = parseInt(req.params.id)

        const delProd = productContainer.remove(id)
        if(delProd){
            return res.status(204).send({message: "Product not found"});
        }
        else if(delProd == 3){
            console.log("Error while saving file")
        }
        return res.status(200).send({message: "Product deleted"});
    } else {
        res.status(400).send({"Error": -1, "Descripcion": "ruta /productos/:id método DELETE no autorizada"}).end()
        return
    }
})

router.delete("/carrito/:id", (req, res)=> {
    const id = parseInt(req.params.id)

    const delCarrito = carritoContainer.remove(id)
    
    if(delCarrito){
        return res.status(204).send({message: "Shopping car not found"});
    }
    else if(delCarrito == 3){
        console.log("Error while saving file")
    }
    return res.status(200).send({message: "Shopping car deleted"});
})

router.delete("carrito/:id/productos/:idProd", (req,res) => {
    let idCar = req.params.id
    let idProd = req.params.idProd
    let resContainer = carritoContainer.removeProduct(idCar, idProd)
    if(resContainer){
        return res.status(204).send({message: "Shopping Car not found or product not in the shopping car"});
    }
    else if(resContainer == 3){
        console.log("Error while saving file")
    }
    return res.status(200).send({message: "Product deleted from car"});
})

module.exports = router