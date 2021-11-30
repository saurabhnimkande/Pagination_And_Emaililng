const nodemailer= require('nodemailer')

module.exports=nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 587,
    secure: false, // upgrade later with STARTTLS
    auth: {
      user: "b518ac38354b9f",
      pass: "b889ca02046d81",
    },
  });