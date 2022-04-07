const express = require("express")
const productContainer = require("./utils/productos")
const carritoContainer = require("./utils/carrito")

const administrador = false;

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
        return res.json({error: "Product not found"}).status(204);
    }
    return res.send(producto)
})

router.post("/productos", (req, res)=> {
    if(administrador){
        const producto = req.body
        const newProd = productContainer.add(producto)

        if(!newProd){
            res.json({Error: "Product couldnt be added"}).status(500)
            return
        }
        return res.json({message: "Product Added", id: newProd.id})
    } else {
        res.status(400).send({"Error": -1, "Descripcion": "ruta /productos método POST no autorizada"}).end()
        return
    }
    
})

router.post("/carrito", (req, res)=> {
    const id = carritoContainer.add()

    if(id <= 0){
        res.json({Error: "Carrito couldnt be created"}).status(500)
        return
    }
    return res.json({message: "Carrito created", id: id})

})

router.put("/productos/:id", (req, res)=> {
    if(administrador){
        const id = parseInt(req.params.id)
        const product = req.body

        const updatedProd = productContainer.update(id, product)

        if(!updatedProd){
            
            return res.json({error: "Product not found"}).status(204);
            
        }
        return res.json({"message": "Product updated"})
    } else {
        res.status(400).send({"Error": -1, "Descripcion": "ruta /productos/:id método PUT no autorizada"}).end()
        return
    }
    
})

router.delete("/productos/:id", (req, res)=> {
    if(administrador){
        const id = parseInt(req.params.id)

        const delProd = productContainer.remove(id)

        if(delProd.length == 0){
            return res.json({error: "Product not found"}).status(204);
        }
        return res.send(delProd)
    } else {
        res.status(400).send({"Error": -1, "Descripcion": "ruta /productos/:id método DELETE no autorizada"}).end()
        return
    }
    
})

router.delete("/carrito/:id", (req, res)=> {
    const id = parseInt(req.params.id)

    const delCarrito = productContainer.remove(id)
    
    if(delCarrito.length == 0){
        return res.json({error: "Carrito not found"}).status(204);
    }

    return res.send(delCarrito)
})
module.exports = router