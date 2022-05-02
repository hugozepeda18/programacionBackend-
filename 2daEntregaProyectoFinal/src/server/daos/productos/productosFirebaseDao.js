import { producto } from '../../models/productosModel.js';

import firebase from 'firebase-admin'
import config from '../../config/config.js';

class productoFirebaseDao{
  
  constructor(){
      console.log("Dao de propductos en Firebase inicializado")
  }

  getProduct = async (id) => {
      console.log("Searching for product")
      const db = firebase.firestore()
      const query = db.collection('productos')

      let prod 
      try{
          prod = await (await query.doc(String(id)).get()).data()
      }catch(e){
          console.log(e)
          return 1
      }
      console.log("Product found")
      return prod
}

  addProduct = async (newProd) => {
      console.log("Adding new product")
      const db = firebase.firestore()
      const query = db.collection('productos')

      try{
          const doc = query.doc(String(newProd.id)).set(newProd)
      } catch(err){
            console.log(err)
            return null
      }
      return newProd.id
  }


  delProduct = async (id) => {
      console.log("Removing product")
      const db = firebase.firestore()
      const query = db.collection('productos') 
      let res
      try{
          res = await query.doc(String(id)).delete()
      }catch(e){
          console.log(e)
          return 1
      }
      console.log("Product Deleted")
      return 0
  }

  updateProduct = async (id, newProd)=> {
      console.log("Updating product")
      const db = firebase.firestore()
      const query = db.collection('productos')     
      let res
      try{
        const doc = query.doc(String(id)).set(newProd)

      }catch(e){
        console.log(e)
        return 1
      }
      console.log("Product Updated")
      return 0
  }

  getAllProd = async () => {
      console.log("Retrieving all product")
      const db = firebase.firestore()
      const query = db.collection('productos')        
      let res
      try{
        res = await query.get()
      }catch(e){
        console.log(e)
        return null
      }
      console.log("Products List retrieved")
      return res.docs.map(doc => doc.data())

  }
}


export default new productoFirebaseDao()

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
