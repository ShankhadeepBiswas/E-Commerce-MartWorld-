const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const WelcomeEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:process.env.SENDER,
        subject:'Thanks for Signing Up!',
        text:`Welcome here, ${name}.We would like to know how you get along with the app.`
    })
}
const CancelEmail = (email,name)=>{
    sgMail.send({
        to:email,
        from:process.env.SENDER,
        subject:'Sorry to see you leave.',
        text:`Hope to see you soon, ${name}!`
    })
}
module.exports ={
    WelcomeEmail,
    CancelEmail
}