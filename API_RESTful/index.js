const express = require("express")
const apiRouter = require("./api")
const path = require("path")
const bodyParse = require("body-parser")

const PORT = 8080
const app = express()

app.use(express.json())
app.use(bodyParse.urlencoded({ extended: false}))
app.use("/api", apiRouter)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
})

app.listen(PORT, () => {
    console.log("Expres is running")
})