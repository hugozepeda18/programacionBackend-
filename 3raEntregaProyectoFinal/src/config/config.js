import "dotenv/config"
const pwd = encodeURIComponent(process.env.MONGODBPASSWORD)

const mongoURL = 'mongodb+srv://admin:' + pwd + '@cluster0.nyk78.mongodb.net/ecommerce'
export default { mongoURL }