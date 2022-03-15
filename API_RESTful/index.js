const express = require("express")
const apiRouter = require("./api")

const PORT = 8080
const app = express()

app.use(express.json())
app.use("/api", apiRouter)


app.get("/", (req, res) => {
    res.send("Hello Server")
})

app.listen(PORT, () => {
    console.log("Expres is running")
})