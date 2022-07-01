import "dotenv/config"
const pwd = encodeURIComponent(process.env.MONGODBPASSWORD)

const mongoURL = 'mongodb+srv://admin:' + pwd + '@cluster0.ii4wa.mongodb.net/ecommerce'
export default { mongoURL }