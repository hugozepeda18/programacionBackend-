import config from "../config/config.js"
import firebase from 'firebase-admin'

class firebaseApp{
  
    constructor(){
        console.log("Firebase inicializado")
        firebase.initializeApp({
          credential: firebase.credential.cert(config.fireBase)
        })
    }
}

export default new firebaseApp()