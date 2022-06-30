import passport from 'passport'

import {Strategy as localStrategy}  from 'passport-local'
import encryptUtils  from '../utils/encryptPassword.js'
import userDao from '../daos/userDao.js'
import logger from '../loggers/loggers.js'
import {transporter, testEmail} from './messagingUtils.js'

const sendRegistrationEmail = async() =>{
    const mailOptions = {
            from: 'E-commerce', // Sender address
            to: testEmail, // List of recipients
            subject: 'Registro exitoso', // Subject line
            text: 'Bienvenido a mi e-commerce!', // Plain text body
    }
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          logger.logError.error(err)
        } else {
          logger.logInfo.info("Correo enviado con éxito");
        }
    });
}

passport.use('register',
    new localStrategy(
        {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            logger.logInfo.info(email)
            const userExists =  await userDao.findUser(email)

            if(userExists){
                logger.logInfo.info(`Usuario ${email} ya registrado`)
                return done(null, userExists)
            } else{
                logger.logInfo.info(`Usuario ${email} no está registrado`)                
                const user = { 
                    email: email,
                    password: password,
                    name: req.body.name,
                    address: req.body.address,
                    age: req.body.age,
                    countryCode: req.body.countryCode,
                    phone: req.body.phone,
                    photo: req.body.photo
                } 

                logger.logInfo.info(`Foto ${user.photo} registrada`)
                user.password = await encryptUtils.encrypt(user.password)
                
                const res = await userDao.addUser(user)
                logger.logInfo.info(`Usuario ${res} registrado`)
                try{
                    logger.logInfo.info(`Enviando correo de registro`)

                    await sendRegistrationEmail()
                }
                catch(e){
                    logger.logError.error(e)
                }
                return done(null, user)
            }
        }
    )
)

passport.use(
    'login',
    new localStrategy(
        {
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback: true
        },
        async (req, email, password, done) => {
        logger.logInfo.info("Login")
        const user =  await userDao.findUser(email)
        logger.logInfo.info(`Usuario registrado ${user?.email}`)
        if (user) {
            const validPwd = await encryptUtils.compare(password, user.password)
        // check user password with hashed password stored in the database
            if (validPwd) {
                logger.logInfo.info("Contraseña correcta, Login exitoso")
                return done(null, user)
            } 
        }
        logger.logInfo.warn("Falló login")
        return done(null, false)
    })
)

passport.serializeUser((user, done) => {
    logger.logInfo.info(`${user} serializado`)
    done(null, user)
})

passport.deserializeUser(async (user, done) => {
    logger.logInfo.info(`${user} deserializado`)
    let userFound = await userDao.findUser(user.email)
    if (!userFound) {
        return done(new Error('No se encontró usuario'), user);
    }
    done(null, userFound);
})
