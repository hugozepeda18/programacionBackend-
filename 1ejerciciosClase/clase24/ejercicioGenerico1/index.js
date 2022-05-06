const express = require('express')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const FileStore = require('session-file-store')(session)

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(8080, () => {
  console.log('servidor levantado')
})

app.use(
  session({
    store: new FileStore({ path: '../sesiones', ttl: 10, retries: 0 }),
    secret: 'secreto',
    resave: true,
    saveUninitialized: true,
  })
)

app.get('/root', (req, res) => {
  if (!req.session.nombre) {
    req.query.nombre
      ? (req.session.nombre = req.query.nombre)
      : (req.session.nombre = 'anonimo')
  }
  if (req.session.contador) {
    req.session.contador++
    res.send(
      `${req.session.nombre} ud ha visitado el sitio ${req.session.contador} veces`
    )
  } else {
    req.session.contador = 1
    res.send('te damos la bienvenida ' + req.session?.nombre)
  }
})
