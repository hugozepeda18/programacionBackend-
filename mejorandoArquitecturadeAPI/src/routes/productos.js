
import express from 'express'

import productDao from '../daos/productMongoDao.js'
import cookieAuth from '../utils/authUtils.js'

//import loggers
import logger from '../loggers/loggers.js'

const router = express.Router()

router.get('/', async (req, res) => {
    let products = await productDao.getAllProd()
    if(products){
        return res.send(products);
    }
    return res.status(500).end();
})

//Routes
router.get('/getProd/:id', async (req, res)=> {
    let id = req.params.id
    let product = await productDao.getProduct(id)
    if(product){
        return res.send(product);
    }
    return res.status(204).end();
})

router.post('/', cookieAuth(), async (req, res, next)=> {
    let producto = req.body
    let resContainer = await productDao.addProduct(producto)
    if(resContainer == 3){
        return res.status(500).send({message: "Producto no agregado"});
    }
    return res.status(201).send({message: "Producto agregado", id: producto.id});
})

router.delete('/:id', cookieAuth(), async (req, res, next) => {
    let id = req.params.id
    let resContainer = await productDao.delProduct(id)
    if(resContainer){
        return res.status(204).send({message: "Producto no encontrado"});
    }
    else if(resContainer == 3){
        logger.logError.error("Error mientras se guardaba el archivo")
    }
    return res.status(200).send({message: "Producto borrado"});
})

router.put('/:id', cookieAuth(), async (req, res, next)=> {
    let id = req.params.id
    let producto = req.body
    let resContainer = await productDao.updateProduct(id, producto)
    if(resContainer){
        return res.status(204).send({message: "Producto no encontrado"});
    }
    else if(resContainer == 3){
        logger.logError.error("Error mientras se guardaba el archivo")
    }
    return res.status(201).send({message: "Producto agregaod"});
})

router.get('/productsPage', async (req, res) => {
    let user = req.user
    let carId = user.shoppingCar ? user.shoppingCar : 10
    let products = await productDao.getAllProd()
    logger.logInfo.info("Accediendo")
    if(products){
        return res.render('products', {products: products, carritoId: cardId})
    }
    return res.status(500).end();
})

export default router