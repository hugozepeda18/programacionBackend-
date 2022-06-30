import {producto} from '../models/productosModel.js';
import mongoose from 'mongoose';
import config from '../config/config.js';

//import loggers
import logger from '../loggers/loggers.js'

class productMongoDao{

  constructor(){
      logger.logInfo.info("Productos inicializados en MongoDB")
      this.URL = config.mongoURL
  }

  connect2Db = async () => {
    console.log("Connectando con MongoDB Atlas")
    
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
      console.log("Buscando producto")
      await this.connect2Db()     
      let prod 
      try{
        prod = await producto.findOne({id: id})
        mongoose.disconnect()
      }catch(e){
        console.log(e)
        return 1
      }
      console.log("Producto encontrado")
      return prod
  }

  addProduct = async (newProd) => {
      console.log("Agregando nuevo producto")
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
      console.log("Producto agregado correctamente")
      return 0    
  }
  
  
  delProduct = async (id) => {
      console.log("Removiendo producto")
      await this.connect2Db()     
      let res
      try{
        res = await producto.deleteOne({id: id})
        mongoose.disconnect()
      }catch(e){
        console.log(e)
        return 1
      }
      console.log("Producto removido")
      return 0
  }
  
  updateProduct = async (id, newProd)=> {
      console.log("Agregando producto")
      await this.connect2Db()     
      let res
      try{
        res = await producto.updateOne({id: id}, newProd, {upsert: true})
        mongoose.disconnect()
      }catch(e){
        console.log(e)
        return 1
      }
      console.log("Producto agregado")
      return 0
  }

  getAllProd = async () => {
    console.log("Trayendo todos los productos")
    await this.connect2Db()     
    let res
    try{
      res = await producto.find({})
      mongoose.disconnect()
    }catch(e){
      console.log(e)
      return 1
    }
    console.log("Lista de todos los productos")
    return res
  }

}


export default new productMongoDao()
