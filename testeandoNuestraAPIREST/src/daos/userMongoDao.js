//TODO: Mandar a DATA

import logger  from '../loggers/loggers.js'
import user from "../models/userModel.js";
import userDto from '../dtos/userDto.js';

import mongoose from "mongoose";

const mongoURL = process.env.MONGOVARIABLE + ':' + process.env.MONGOURL

class userMongoDao {
  constructor() {
    logger.logInfo.info("Usuarios inicializados en MongoDB");
    this.URL = mongoURL;
  }

  connect2Db = async () => {
    logger.logInfo.info("Connectando con MongoDB Atlas");

    try {
      await mongoose.connect(this.URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (e) {
      logger.logInfo.error(e);
    }
  };

  findUser = async (email) => {
    logger.logInfo.info(`Query para usuario ${email}`);
    await this.connect2Db();
    let res;
    try {
      res = await user.findOne({ email: email });
    } catch (e) {
      logger.logInfo.error(e);
      return null;
    }
    if(!res){
      logger.logInfo.info(`Usuario ${email} no encontrado`);
      return null
    }
    logger.logInfo.info(`Usuario encontrado con ID ${res._id}`);
    const userObj = userDto(res)
    return userObj;
  }

  addUser = async (userInfo) => {
    logger.logInfo.info(`Agregando usuario ${userInfo.email}`);
    await this.connect2Db();
    try {
      var res = await user.create(userInfo);
      mongoose.disconnect();
    } catch (err) {
      logger.logInfo.error(err);
      return null;
    }
    logger.logInfo.info(`Nuevo usuario ${userInfo.email} agregado`);
    return res.email;
  };

  addCarToUser = async(email, shoppingCar) =>{
    logger.logInfo.info(`Agregando carrito de compras con ID ${shoppingCar} al usuario ${email}`)
    
    await this.connect2Db();
    try {
      var res = await user.updateOne({email: email},
        {"$set": {shoppingCar: shoppingCar}});
      mongoose.disconnect();
    } catch (err) {
      logger.logInfo.error(err);
      return null;
    }
    logger.logInfo.info(`Confimación carrito de compras actualizado ${res.acknowledged}`);
    return res.modifiedCount;

  }

}

export default userMongoDao