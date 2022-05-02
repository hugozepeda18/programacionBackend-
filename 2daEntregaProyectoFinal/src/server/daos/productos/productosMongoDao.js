import {producto} from '../../models/productosModel.js';
import mongoose from 'mongoose';
import config from '../../config/config.js';
class productMongoDao{

  constructor(){
      console.log("Dao de productos en Mongo inicializado")
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

  getProduct = async (id) => {
      console.log("Searching for product")
      await this.connect2Db()     
      let prod 
      try{
        prod = await producto.findOne({id: id})
        mongoose.disconnect()
      }catch(e){
        console.log(e)
        return 1
      }
      console.log("Product found")
      return prod
  }

  addProduct = async (newProd) => {
      console.log("Adding new product")
      await this.connect2Db()

      newProd.timestamp = Date.now()
      let res
      try{
        res = await producto.create(newProd)
        mongoose.disconnect()
      }catch(e){
        console.log(e)
        return 1
      }
      console.log("Product added correctly")
      return 0    
  }
  
  
  delProduct = async (id) => {
      console.log("Removing product")
      await this.connect2Db()     
      let res
      try{
        res = await producto.deleteOne({id: id})
        mongoose.disconnect()
      }catch(e){
        console.log(e)
        return 1
      }
      console.log("Product Deleted")
      return 0
  }
  
  updateProduct = async (id, newProd)=> {
      console.log("Updating product")
      await this.connect2Db()     
      let res
      try{
        res = await producto.updateOne({id: id}, newProd, {upsert: true})
        mongoose.disconnect()
      }catch(e){
        console.log(e)
        return 1
      }
      console.log("Product Updated")
      return 0
  }

  getAllProd = async () => {
    console.log("Retrieving all product")
    await this.connect2Db()     
    let res
    try{
      res = await producto.find({})
      mongoose.disconnect()
    }catch(e){
      console.log(e)
      return 1
    }
    console.log("Products List retrieved")
    return res
  }

}


export default new productMongoDao()

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
