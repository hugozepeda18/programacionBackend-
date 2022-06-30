import logger from '../loggers/loggers.js'
import express from 'express'

import carritoDao from '../daos/carritosMongoDao.js'
import userMongoDao from '../daos/userDao.js'

import passport from 'passport'
import carritosMongoDao from '../daos/carritosMongoDao.js'

var router = express.Router()

router.post('/register', passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register/error'
}))

router.post('/login', passport.authenticate('login', {
    successRedirect: '/home',
    failureRedirect: '/login/error'
}))


router.get('/shoppingCar', async (req, res) => {
    let user = req.user
    logger.logInfo.info(`Entrando a sus carritos de compra para el ${user}`)
    
    try{
        var userInfo = await userMongoDao.findUser(user.email)
    }
    catch(e){
        return res.end({error: e})
    }

    if(userInfo.shoppingCar == null){
        logger.logInfo.warn(`El usuario no cuenta con carrito de compras`)
        //CreateCar for user
        logger.logInfo.info("Agregando carrito de compras al usuario")
        let newCarId = await carritoDao.addShoppingCar()

        let addCarRes = await userMongoDao.addCarToUser(user, newCarId)
        if(!addCarRes){
            logger.logInfo.warn("El carrito de compras no se agrego")

            return res.status(500).end({error: "Carrito de compras no agregado"})
        }
        userInfo.shoppingCar = newCarId
    }
    logger.logInfo.info(`Usuario ${user} tiene el carrito de compras ${userInfo.shoppingCar}`)
    
    let products = await carritosMongoDao.getProdsInCar(userInfo.shoppingCar)
    logger.logInfo.info(`Productos en el carrito ${products?.length}`)

    return res.render('shoppingCar', {products: products? products: []})
})

export default router