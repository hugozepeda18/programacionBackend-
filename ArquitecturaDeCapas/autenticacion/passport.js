const passport = require('passport')
const bcrypt = require('bcryptjs')
const LocalStrategy = require('passport-local').Strategy
const usuarios = require("../persistencia/usuarios")

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

module.exports = passport