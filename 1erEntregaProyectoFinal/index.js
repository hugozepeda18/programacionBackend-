const express = require("express")
const apiRouter = require("./api")

const PORT = 8080
const app = express()

app.use(express.json())
app.use("/api", apiRouter)

app.use((req, res, next) => {
    let metodo = req.method
    let ruta = req.path
    res.status(404).send({error: -2, descripcion: `ruta ${ruta}, metodo ${metodo} no implementada`})
})

app.listen(PORT, () => {
    console.log("Express is running")
})