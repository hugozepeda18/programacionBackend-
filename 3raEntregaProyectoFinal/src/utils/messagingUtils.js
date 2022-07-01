import nodemailer from "nodemailer"
import twilio from 'twilio'

const accountSid = process.env.ACCSID
const authToken = process.env.AUTHTOKEN
const yourNumber = process.env.YOURNUMBER
const twilioNumber = process.env.TWILIONUMBER

const client = twilio(accountSid, authToken)

const sendCheckoutMessage = async(user, products) =>{ 
    try{
        const msg = await client.messages.create({
        body: `Gracias por tu compra! Estamos procesando tu compra ${user.name}`,
        to: yourNumber, 
        from: twilioNumber
        })  
        logger.logInfo.info(msg)}
    catch(e){
        logger.logInfo.error(e)
    }
}

client.messages
  .create({
    body: 'Hello from Node',
    to: yourNumber, 
    from: twilioNumber, 
  })
  .then((message) => console.log(message.sid));

const testEmail = "daron.wilkinson53@ethereal.email"

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'daron.wilkinson53@ethereal.email',
        pass: 'JcMH5482GJgwJMyHmk'
    }
});

const sendRegistrationEmail = async() =>{
    const mailOptions = {
            from: 'E-commerce Owner', 
            to: testEmail, 
            subject: 'Confirmación de registro', 
            text: 'Bienvenido a mi e-commerce!!', 
    }
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          logger.logError.error(err)
        } else {
          logger.logInfo.info("Correo enviado con éxito");
        }
    });
}

const sendCheckoutEmail = async(user, products) =>{
    const mailOptions = {
            from: 'E-commerce Purchase Deparment', 
            to: testEmail, 
            subject: 'Nuevo pedido de' + user.name + " " + user.email , 
            text: `Gracias por su compra, esto es para confirmar que compró lo siguiente: ${products}`, 
    }
    transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
          logger.logError.error(err)
        } else {
          logger.logInfo.info("Correo enviado con éxito");
        }
    });
}

export {sendRegistrationEmail, sendCheckoutEmail, sendCheckoutMessage}