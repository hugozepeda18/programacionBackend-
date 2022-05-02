import "dotenv/config"
const pwd = process.env.pwd

import fireBase from './firebase.json';
  
const mongoURL  =`mongodb+srv://admin:${pwd}@cluster0.ii4wa.mongodb.net/ecommerce`
export default { mongoURL, fireBase }