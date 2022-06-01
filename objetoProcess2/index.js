import express from 'express'
import apiRouter from './router/router.js'

const PORT = 8080

const app = express()
app.use(express.json())

app.use('/api/randoms', apiRouter)

app.listen(PORT, () => {
    console.log("Express Running")
})
