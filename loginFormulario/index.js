const express = require('express')
const path = require('path')
const session = require("express-session")

const MongoStore = require('connect-mongo')
const advancedOpts = {useNewUrlParser: true, useUnifiedTopology: true}


const app = express()

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.listen(8080,() => {
    console.log("server running")
})


app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://admin:coderhouse22@cluster0.ii4wa.mongodb.net/sessiones?retryWrites=true&w=majority",
        mongoOptions: advancedOpts
    }),
    secret: "hhhhhh",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 10, ///10 mins,
        sameSite: false
    },
}))

app.get('/home', (req, res)=> {
    if(!req.session.name){
        console.log("user not logged in")
        res.redirect('/login')
    }
    else{
        res.render('logged', {username: req.session.name})
    }
})

app.post('/user/login', (req, res) => {
    
    if(!req.session.name){
        req.body.username?
        (req.session.name = req.body.username):
        (req.session.name = "anonimo")
    }
    res.redirect('/home')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/logout', (req, res) => {

    let username = req.session.name

    req.session.destroy((err) =>{
        if(!err) res.render('logout', {username: username})
        else res.render('logoutErr')
    })
    
})