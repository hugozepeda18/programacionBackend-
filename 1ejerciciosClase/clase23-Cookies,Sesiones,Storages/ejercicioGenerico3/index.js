const express = require('express')
const session = require('express-session')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.listen(8080, () => {
  console.log('servidor Levantado')
})

app.use(
  session({
    secret: 'secreto',
    resave: true,
    saveUnitialized: true,
  })
)

app.get('/con-session', (req, res) => {
  if (req.session.contador) {
    req.session.contador++
    res.send(`ud ha visitado el sitiio ${req.session.contador} veces`)
  } else {
    req.session.contador = 1
    res.send('bienvenido')
  }
})

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (!err) res.send('Logout ok!')
    else res.send({ status: 'logout Error', error: err })
  })
})

app.get('/login', (req, res) => {
  const { username, password } = req.query
  if (username !== 'pepe' || password !== 'pepepass') {
    return res.send('login failed')
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