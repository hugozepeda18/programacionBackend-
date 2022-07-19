import "dotenv/config"

import productMongoDao from './productMongoDao.js'
import carritoMongoDao from './carritoMongoDao.js'
import userMongoDao from './userMongoDao.js'

const daoType = process.env.DAOTYPE

class daoFactory{
    constructor(daoType){
        this.daos = {}
    }
    createDaoObjects(daoType){
        if (this.daos?.daoType){
            return this.daos.daoType
        }
        else if(daoType === 'MONGO'){
            this.daos[daoType] = {
                productDao: new productMongoDao(),
                carritoDao: new carritoMongoDao(),
                userDao: new userMongoDao()
            }
            return this.daos[daoType]
        }
        else{
            //TODO: Here would go the implementation for a SQL DB
            this.daos[daoType] = {
                productDao: new productMongoDao(),
                carritoDao: new carritoMongoDao(),
                userDao: new userMongoDao()
            }
            return this.daos[daoType]
        }
    }
}

export const daoFactoryObj =  new daoFactory(daoType)
export const objectsDaos = daoFactoryObj.createDaoObjects(daoType)