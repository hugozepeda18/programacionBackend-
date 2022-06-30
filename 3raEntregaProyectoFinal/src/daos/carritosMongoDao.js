import { carrito } from '../models/carritoModel.js';

import mongoose from 'mongoose';
import config from '../config/config.js';

import loggers from '../loggers/loggers.js';

class carritoMongoDao{

  constructor(){
      loggers.logInfo.info("Carritos inicializados en MongoDB")
      this.URL = config.mongoURL
  }

  connect2Db = async () => {
    loggers.logInfo.info("Connectando con MongoDB Atlas")
    
    try{
        await mongoose.connect(
            this.URL,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true
            })
    }catch(e){
        loggers.logInfo.error(e)
    }
  }

  addShoppingCar = async () => {
      loggers.logInfo.info("Agregando carrito de compras")
      await this.connect2Db() 
      let newCar = {
        "id": 1,
        "timestamp": Date.now(),
        "products": []
      }
      let cars = await this.getAllCars()
      if(cars.length != 0){
        const max = cars.reduce(function(prev, current) {
          return (prev.id > current.id) ? prev : current
        })
        newCar.id = parseInt(max.id) + 1
      }
      try{
        var res = await carrito.create(newCar)
        mongoose.disconnect()
      } catch(err){
          loggers.logInfo.info(err)
          return null
      }
      return newCar.id
  }

  delShoppingCar = async (id) => {
      loggers.logInfo.info("Removiendo carrito de compras")
      await this.connect2Db() 
      let res
      try{
        res = await carrito.deleteOne({id: id})
        mongoose.disconnect()
      }catch(e){
        loggers.logInfo.error(e)
        return 1
      }
      return 0
  }
  getProdsInCar = async (id) => {
      loggers.logInfo.info("Poniendo productos en carrito de compras")
      await this.connect2Db() 
      let res
      try{
        res = await carrito.findOne({id: id})
        mongoose.disconnect()
      }catch(e){
        loggers.logInfo.error(e)
        return 1
      }
      loggers.logInfo.info(`Los productos en el carrito de compras son: ${res.productos}`)
      return res.products
  }
  addProduct = async (id, newProd) => {
      loggers.logInfo.info(`Agregando producto ${newProd} al carrito de compras ${id}`)
      await this.connect2Db() 
      let car
      try{
          car = await carrito.findOne({id: id})
      }catch(e){
        loggers.logInfo.error(e)
        return 1
      }
      loggers.logInfo.info("Agregando el producto al carrito de compras")
      if(car.products.length != 0){
        const max = car.products.reduce(function(prev, current) {
          return (prev.id > current.id) ? prev : current
        })
        newProd.id = parseInt(max.id) + 1
      }
      else{
        newProd.id = 1
      }
      car.products.push(newProd)
      loggers.logInfo.info(car.products)
      let res
      try{
          res = await carrito.updateOne({id: id}, car)
          mongoose.disconnect()
      }catch(e){
        loggers.logInfo.error(e)
        return 1
      }
      loggers.logInfo.info(`Producto agregado con ID ${newProd.id}`)
      return 0      
  }
  
  delProduct = async (idCar, idProd) => {
      loggers.logInfo.info("Removiendo producto")
      await this.connect2Db() 
      let res
      try{
          res = await carrito.updateOne({id: idCar},
            {$pull: {products: {id: idProd}}})
            loggers.logInfo.info(res)
          mongoose.disconnect()
        }catch(e){
          loggers.logInfo.error(e)
          return 1
      }
      
      return 0
  }

  getAllCars = async () => {
      loggers.logInfo.info("Trayendo todos los carritos de compras")
      await this.connect2Db()     
      let res
      try{
        res = await carrito.find({})
      }catch(e){
        loggers.logInfo.error(e)
        return null
      }
      loggers.logInfo.info("Lista de carritos")
      return res


  }

}

export default new carritoMongoDao()
