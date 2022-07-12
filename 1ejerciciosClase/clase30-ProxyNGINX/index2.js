const express = require('express')

const app = express()

const PORT = parseInt(process.argv[2]) || 8082

app.get('/datos', (req, res) => {
    console.log(`port: ${PORT} -> Fyh ${Date.now()}`)
    res.send(`Servidor con express <span style="color:vlueviolet;>(Nginx)</span> en ${PORT} - <b>PID ${process.pid}</b> - ${new Date().toLocaleDateString}`)
})

app.listen(PORT, err => {
    if(!err) console.log(`Servidor express escuchando en el puerto ${PORT} - PID WORKER ${process.pid}`)
})