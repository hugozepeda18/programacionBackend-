import logger from '../loggers/loggers.js'
import express from 'express'
import { fork } from "child_process"
  
// Single routing
var router = express.Router()

router.get("/randoms", (req, res) => {
    
    const num2Generate = req.query.count

    const forked = fork("./src/utils/randoms")

    forked.send(num2Generate? num2Generate: 100000000)

    logger.logInfo.info(`Números a generar ${num2Generate}`)

    forked.on("message", (randoms) =>{
        res.send(randoms)
    })

})

export default router