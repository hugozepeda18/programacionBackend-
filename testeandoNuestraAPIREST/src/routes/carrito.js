import express from 'express'

import productsDao from '../daos/productMongoDao.js'
import carritoDao from '../daos/carritoMongoDao.js'

const router = express.Router()

import logger from '../loggers/loggers.js'

router.get('/', (req, res) => {
    res.status(200).send('route at shoppingCars')
})

router.post('/', async (req, res)=> {
    let resContainer = await carritoDao.addShoppingCar()
    if(resContainer == null){
        logger.logWarning.warn("Carrito de compras no guardado") 
        return res.status(500).send({message: "Carrito de compras no agregado", status: 500});
    }
    return res.status(201).send({message: "Carrito de compras agregado", id: resContainer});
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id
    let resContainer = await carritoDao.delShoppingCar(id)
    if(resContainer){
        return res.status(204).send({message: "Carrito de compras no se encontro"});
    }
    else if(resContainer == 3){
        logger.logWarning.war("Error al guardar archivo")
    }
    return res.status(200).send({message: "Carrito de compras borrado"});
})

router.get('/:id/productos', async (req, res)=> {
    let id = req.params.id
    let product = await carritoDao.getProdsInCar(id)
    if(product){
        return res.send(product);
    }
    return res.status(204).end();
})

router.post('/:idCar/productos/:idProd', async (req, res)=> {
    let idCar = req.params.idCar
    let idProd = req.params.idProd
    //Get porod by Id
    let newProd = await productsDao.getProduct(idProd)
    if(!newProd){
        res.status(204).send({message: "No existe ese producto"})
    }
    let resContainer = await carritoDao.addProduct(idCar, newProd)
    if(resContainer){
        return res.status(204).send({message: "Carrito de compras no encontrado"});
    }
    else if(resContainer == 3){
        logger.logWarning.war("Error al guardar archivo")
    }
    return res.status(201).send({message: "Carrito de compras actualizado"});
})

router.delete('/:idCar/productos/:idProd', async (req, res) => {
    let idCar = req.params.idCar
    let idProd = req.params.idProd
    let resContainer = await carritoDao.delProduct(idCar, idProd)
    if(resContainer){
        return res.status(204).send({message: "Carrito de compras no encontrado o producto no está en carrito"});
    }
    else if(resContainer == 3){
        logger.logWarning.war("Error al guardar archivo")
    }
    return res.status(200).send({message: "Producto eliminado del carrito de compras"});
})

export default router