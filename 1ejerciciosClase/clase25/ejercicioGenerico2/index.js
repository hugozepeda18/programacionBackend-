import express, { application } from 'express'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import hbs from 'express-handlebars'
import passport from 'passport'
import { Strategy } from 'passport-local'

const localStrategy = Strategy
const app = express()

app.use(passport.initialize())
app.use(passport.session())

passport.use('login', new localStrategy((username, password, done) => {
    const existe = usuarios.find(usuario => {
        return usuario.nombre === username && usuario.password === password
    })
    if(!existe){
        return(null, false)
    } else {
        return done(null, existe)
    }
}))

passport.serializeUser((usuario, done) => {
    done(null, usuario.nombre)
})

passport.deserializeUser((nombre, done) => {
    const usuarioDz = usuarios.find(usuario => {usuario.nombre === nombre})
    console.log
    done(null, usuarioDz)
})

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

app.post('/login', passport.authenticate('login', 
{
    successRedirect: '/datos',
    failureRedirect: '/login-error'
}
))

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