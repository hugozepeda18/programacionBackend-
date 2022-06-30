import nodemailer from "nodemailer"

const testEmail = "daron.wilkinson53@ethereal.email"

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'daron.wilkinson53@ethereal.email',
        pass: 'JcMH5482GJgwJMyHmk'
    }
});

export {transporter, testEmail}