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

app.get('/reiniciar', (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.send('Logout ok!')
    else res.send({ status: 'logout Error', error: err })
  })
})

app.get('/login', (req, res) => {
  //const { username, password } = req.query

  req.session.user = req.query.user
  if (req.session.user === 'pepe') {
    req.session.admin = true
  }
  res.send('login success!')
})

function auth(req, res, next) {
  if (req.session?.user === 'pepe' && req.session?.admin) {
    return next()
  }
  return res.status(401).send('error de autorización!')
}

app.get('/privado', auth, (req, res) => {
  res.send('si estas viendo esto es porque ya te logueaste!')
})
