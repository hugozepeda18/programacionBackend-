import "dotenv/config"
const pwd = process.env.pwd
  
const mongoURL  =`mongodb+srv://admin:${pwd}@cluster0.ii4wa.mongodb.net/ecommerce`
export default { mongoURL }