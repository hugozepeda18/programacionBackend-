const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const hbs = require('express-handlebars')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const usuarios = []

const app = express()
app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.use(cookieParser())
app.use(
    session({
        secret: 'secreto',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 20000, //20 SEG
        }
    })
)

app.use(passport.initialize())
app.use(passport.session())

//ESTRATEGIAS
passport.use('register', 
    new LocalStrategy(
        { passReqToCallback: true },
        (req, username, password, done) => {
            const existe = usuarios.find( usuario => usuario.nombre === username)
            if(existe){
                console.log('User exits')
                return done(null, false)
            } else {
                usuarios.push({nombre: username, password: password})
                console.log(usuarios)
                done(null, {nombre: username})
            }
        }
    )
)

passport.use('login', 
    new LocalStrategy(
        (username, password, done) => {
            console.log('IN')
            const existe = usuarios.find( usuario => {
                return usuario.nombre === username && usuario.password === password
            }) 
            console.log(existe)
            if(!existe){
                return done(null, false)
            } else {
                return done(null, existe)
            }
        }
    )
)

passport.serializeUser((usuario, done) => {
    done(null, usuario.nombre)
})

passport.deserializeUser((nombre, done) => {
    const usuarioDZ = usuarios.find( usuario => usuario.nombre === nombre)
    done(null, usuarioDZ)
})

//PLANTILLAS
app.set('views', './src/views')

app.engine(
    '.hbs',
    hbs.engine({
        defaultLayout: 'main',
        layoutsDir: './src/views/layouts',
        extname: '.hbs'
    })
)

//RUTAS
app.get('/registrar', (req, res) => {
    res.render('register')
})

app.post('/registrar', passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/login-error'
}))

app.get('/login', (req, res) => {
    req.logOut()
    res.render('login')
})

app.post('/login', passport.authenticate('login', {
    successRedirect: '/datos',
    failureRedirect: '/login-error'
})
)

app.get('/login-error', (req, res) => {
    res.render('login-error')
})

app.get('/datos', (req, res) => {
    const { nombre, direccion } = req.user
    res.send( {nombre, direccion} )
})

app.get('/logout', (req, res) => {
    req.logOut()
    res.render('/login')
})

//SERVER
app.listen(8080, () => {
    console.log('Server up')
})