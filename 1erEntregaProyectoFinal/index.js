const express = require("express")
const apiRouter = require("./api")
const path = require("path")
const bodyParse = require("body-parser")

const PORT = 8080
const app = express()

app.use(express.json())
app.use(bodyParse.urlencoded({ extended: false}))
app.use("/api", apiRouter)

app.use((req, res, next) => {
    let metodo = req.method
    let ruta = req.path
    res.send({error: -2, descripcion: `ruta ${ruta}, metodo ${metodo} no implementada`}, 404)
})

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.listen(PORT, () => {
    console.log("Express is running")
})