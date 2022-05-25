const express = require('express')
const session = require('express-session')
const cookieParser = require ('cookie-parser')
const handlebars = require('express-handlebars')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const path = require("path")
const bcrypt = require('bcryptjs');

const usuarios = []

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(cookieParser())
app.use(
    session({
        secret: 'secreto',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 600000,
        }
    })
)

app.use(passport.initialize())
app.use(passport.session())

//STRATEGY
passport.use('register', 
    new LocalStrategy(
        { passReqToCallback: true },
        (req, username, password, done) => {
            const existe = usuarios.find( usuario => usuario.email === username)
            if(existe){
                console.log('User exits')
                return done(null, false)
            } else {
                bcrypt.hash(password, 10).then(hash => {
                    console.log(hash)
                    usuarios.push({email: username, password: hash})
                    done(null, {email: username})
                })
            }
        }
    )
)

passport.use('login', 
    new LocalStrategy(
        (username, password, done) => {
            const existe = usuarios.find( usuario => {
                if(!bcrypt.compare(usuario.password, password)){return done(null, false)}
                return usuario.email === username 
            }) 
            console.log(existe)
            if(!existe){
                return done(null, false)
            } else {
                console.log('Logged')
                return done(null, existe)
            }
        }
    )
)

passport.serializeUser((usuario, done) => {
    console.log(usuario.email + ' serializado')
    done(null, usuario.email)
})

passport.deserializeUser((username, done) => {
    const usuarioDZ = usuarios.find( usuario => usuario.email === username)
    console.log(JSON.stringify(usuarioDZ) + ' deserializado')
    done(null, usuarioDZ)
})

//TEMPLATE
app.set("views", path.join(__dirname, 'views'))

const hbs = handlebars.create({
    extname: ".hbs",
    defaultLayout: "main.hbs",
    layoutsDir: './views/layouts'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

//ROUTES
app.get('/registrar', (req, res) => {
    res.render('register')
})

app.post('/registrar', passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/signup-error'
}))

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/login', passport.authenticate('login', {
    successRedirect: '/datos',
    failureRedirect: '/login-error'
}))

app.get('/login-error', (req, res) => {
    res.render('login-error')
})

app.get('/signup-error', (req, res) => {
    res.render('signup-error')
})

app.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('login')
})

app.get('/datos', (req, res) => {
    const { email, password } = req.user
    res.render('datos', {email})
})

//SERVER
app.listen(8080, () => {
    console.log('Server up')
})