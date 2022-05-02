import { carrito } from '../../models/carritoModel.js';

import mongoose from 'mongoose';
import config from '../../config/config.js';

class carritoMongoDao{

  constructor(){
      console.log("Dao de Carritos en Mongo inicializado")
      this.URL = config.mongoURL
  }

  connect2Db = async () => {
    console.log("connecting to mongoDB atlas")
    
    try{
        await mongoose.connect(
            this.URL,
            {
              useNewUrlParser: true,
              useUnifiedTopology: true
            })
    }catch(e){
        console.log(e)
    }
  }

  addShoppingCar = async () => {
      console.log("Adding new shopping car")
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
          console.log(err)
          return null
      }
      return newCar.id
  }

  delShoppingCar = async (id) => {
      console.log("Removing Shopping car")
      await this.connect2Db() 
      let res
      try{
        res = await carrito.deleteOne({id: id})
        mongoose.disconnect()
      }catch(e){
        console.log(e)
        return 1
      }
      return 0
  }
  getProdsInCar = async (id) => {
      console.log("Getting products in car")
      await this.connect2Db() 
      let res
      try{
        res = await carrito.findOne({id: id})
        mongoose.disconnect()
      }catch(e){
        console.log(e)
        return 1
      }
      console.log(`Products in cart are ${res.productos}`)
      return res.products
  }
  addProduct = async (id, newProd) => {
      console.log("Adding new product to Car")
      await this.connect2Db() 
      let car
      try{
          car = await carrito.findOne({id: id})
      }catch(e){
        console.log(e)
        return 1
      }
      console.log("Adding product to car")
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
      console.log(car.products)
      let res
      try{
          res = await carrito.updateOne({id: id}, car)
          mongoose.disconnect()
      }catch(e){
        console.log(e)
        return 1
      }
      console.log(`Product added with Id ${newProd.id}`)
      return 0      
  }
  
  delProduct = async (idCar, idProd) => {
      console.log("Removing product")
      await this.connect2Db() 
      let res
      try{
          res = await carrito.updateOne({id: idCar},
            {$pull: {products: {id: idProd}}})
            console.log(res)
          mongoose.disconnect()
        }catch(e){
          console.log(e)
          return 1
      }
      
      return 0
  }

  getAllCars = async () => {
      console.log("Retrieving all cars")
      await this.connect2Db()     
      let res
      try{
        res = await carrito.find({})
      }catch(e){
        console.log(e)
        return null
      }
      console.log("Cars List retrieved")
      return res


  }

}


export default new carritoMongoDao()

//const ob = new productMongoDao()
/* ob.addProduct({
    "nombre": "flauta",
    "descripcion": "instrumento para tocar unas rolitas",
    "codigo": "SDFGHJQW123",
    "url": "www.google.com",
    "stock": 40,
    "id": 1,
    "precio": 203

}).then(res => console.log(res))  */

//ob.getProduct(1).then(prod => console.log(prod))
//ob.delProduct(1).then(prod => console.log(prod))
