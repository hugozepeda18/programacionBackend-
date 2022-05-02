import { carrito } from '../../models/carritoModel.js';

import firebase from 'firebase-admin'
import config from '../../config/config.js';

class carritoFirebaseDao{

    constructor(){
        console.log("Dao de Carritos en Firebase inicializado")

    }

    addShoppingCar = async () => {
        console.log("Adding new shopping car")
        const db = firebase.firestore()
        const query = db.collection('carritos')

        let newCar = {
          "id": "1",
          "timestamp": Date.now(),
          "products": []
        }
        let cars = await this.getAllCars()
        if(cars.length != 0){
          const max = cars.reduce(function(prev, current) {
            return (prev.id > current.id) ? prev : current
          })
          newCar.id = String(parseInt(max.id) + 1)
        } 
        try{
          const doc = query.doc(newCar.id).set(newCar)
        } catch(err){
            console.log(err)
            return null
        }
        return newCar.id
    }

    delShoppingCar = async (id) => {
        console.log("Removing Shopping car")
        const db = firebase.firestore()
        const query = db.collection('carritos')
        let res
        try{
          res = await query.doc(id).delete()
        }catch(e){
          console.log(e)
          return 1
        }
        return 0
    }

    getProdsInCar = async (id) => {
        console.log("Getting products in car")
        const db = firebase.firestore()
        const query = db.collection('carritos')
        let car
        let prods
        try{
          car = await (await query.doc(String(id)).get()).data()
          prods = car.products
        }catch(e){
          console.log(e)
          return 1
        }
        console.log(`Products in cart are ${JSON.stringify(prods)}`)
        return prods
    }

    addProduct = async (id, newProd) => {
        console.log("Adding new product to Car")
        const db = firebase.firestore()
        const query = db.collection('carritos')
        let car
        try{
            car =  await (await query.doc(String(id)).get()).data()
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
            res = query.doc(String(id)).set(car)
        }catch(e){
          console.log(e)
          return 1
        }
        console.log(`Product added with Id ${newProd.id}`)
        return 0      
    }
    
    delProduct = async (idCar, idProd) => {
        console.log("Removing product")
        const db = firebase.firestore()
        const query = db.collection('carritos')
        let car
        try{
            car =  await (await query.doc(String(idCar)).get()).data()
        }catch(e){
          console.log(e)
          return 1
        }
        try{
          await query.doc(String(idCar)).update({
            products: car.products.filter(prod => prod.id != idProd)
          })
        }catch(e){
          console.log(e)
          return 1
        }
        
        return 0
    }

    getAllCars = async () => {
        console.log("Retrieving all cars")
        const db = firebase.firestore()
        const query = db.collection('carritos')
        let res
        try{
          res = await query.get()
        }catch(e){
          console.log(e)
          return null
        }
        console.log("Cars List retrieved")
        return res.docs.map(doc => doc.data())


    }

  }


export default new carritoFirebaseDao()

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
