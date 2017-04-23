require('dotenv').config()

module.exports = {
    mysql: {
      host: process.env.HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE
    },
    senderMail: {
      user: process.env.MAIL_ACCOUNT, //gmail account
      pass: process.env.MAIL_PASSWORD //gmail password
    },
    secret: process.env.MY_SECRET
}
