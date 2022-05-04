const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(8080, () => {
  console.log('servidor Levantado')
})
/*
app.get('/set', (req, res) => {
  res.cookie('server', 'express').send('cookie set')
})

app.get('/setEX', (req, res) => {
  res.cookie('server2', 'express2', { maxAge: 10000 }).send('cookie set')
})

app.get('/get', (req, res) => {
  res.send(req.cookies.server)
})

app.get('/clr', (req, res) => {
  res.clearCookie().send('Cookie Clear')
})
*/

app.post('/cookies', (req, res) => {
  if (req.body.time == undefined) {
    res.cookie(req.body.nombre, req.body.valor).send({ proceso: 'ok' })
  } else {
    res
      .cookie(req.body.nombre, req.body.valor, { maxAge: req.body.time })
      .send({ proceso: 'ok' })
  }
})

app.get('/', (req, res) => {
  res.send(req.cookies)
})

app.delete('/clr', (req, res) => {
  console.log(req.query.nombre)
  res.clearCookie(req.query.nombre).send({ proceso: 'ok' })
})
