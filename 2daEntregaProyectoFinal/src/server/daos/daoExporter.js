import "dotenv/config"


const dbConn = process.env.DBCONNECTION

let prodPath
let carritoPath
if(dbConn == "mongo"){
    prodPath = "productosMongoDao.js"
    carritoPath = "carritosMongoDao.js"
}
else if (dbConn == "filesystem"){
    prodPath = "contenedorProductos.js"
    carritoPath = "contenedorCarrito.js"
}
else {
    const firebaseApp = await import('./firebaseApp.js')
    prodPath = "productosFirebaseDao.js"
    carritoPath = "carritosFirebaseDao.js"
}
const productDaoModule = await import(`../daos/productos/${prodPath}`)
const carritoDaoModule = await import(`../daos/carrito/${carritoPath}`)
export {productDaoModule}
export {carritoDaoModule}
