import jwt from 'jsonwebtoken'

const PRIVATE_KEY = 'miClavePrivada'
const app = express()

function generarToken(user){
    const token = jwt.sign({data: user}, PRIVATE_KEY, {expiresIn: '1h'})
    return token
}

