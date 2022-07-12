import express, { application } from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import hbs from 'express-handlebars'

const app = express()

app.set('views', './src/views')
app.engine('.hbs', hbs.engine({
    defaultLayout: 'main',
    layoutsDir: './src/views/layouts',
    extname: '.hbs'
}))

app.set('view engine', '.hbs')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//DB
const usuarios = []
//Session

app.use(cookieParser())
app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 20000
    }
}))

//Rutas
app.get('/registrar', (req,res) => {
    res.render('register')
})

app.post('/registrar', (req,res) => {
    const { nombre, password, direccion } = req.body
    if(usuarios.find(usuario => {
        return usuario.nombre == nombre
    })){
        res.render('register-error')
    } else {
        usuarios.push({ nombre, password, direccion})
        console.log(usuarios)
        res.render('login')
    }
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.post('/login', (req, res) => {
    const { nombre, password } = req.body
    const valido = usuarios.find(usuario => usuario.nombre === nombre && usuario.password === password)
    if(valido){
        req.session.nombre = nombre
        req.session.password = password
        res.redirect('datos')
    } else {
        res.render('login-error')
    }
})

app.get('/datos', isLogged, (req, res) => {
    const { nombre, direccion } = req.session
    res.send({ nombre, password})
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.render('login')
})

function isLogged(req, res, next){
    if(req.session.nombre){
        next()
    } else {
        res.redirect('/login')
    }
}

//Server
app.listen(8080, () => {
    console.log('Server up')
})