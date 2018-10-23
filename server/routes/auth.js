const express = require("express")
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const model = require("../models/index")
const withAsync = require("../utils/utils").withAsync

const generateSalt = () => {
  return bcrypt.genSaltSync(10)
}
const generatePassword = (password, salt) => {
  return bcrypt.hashSync(password, salt)
}
const checkPassword = (password, hashedPassword, salt) => {
  return bcrypt.hashSync(password, salt) === hashedPassword
}

router.post(
  "/",
  withAsync( async (req, res, next) => {
    const { email, password } = req.body;

    const auth = await model.Auth.findOne({ where: {email: email}});
    const isCorrect = auth && checkPassword(password, auth.password, auth.salt)

    if(isCorrect) {
      const token = jwt.sign({
        email: auth.email
      }, auth.salt)
      // Here we can send token to passportjs and redis

      return res.json({
        error: false,
        data: {
          id: auth.id,
          token: token
        }
      })
    } else {
      return res.status(401).json({
        error: true,
        message: "Email or password is incorrect",
      })
    }
  })
);

router.post(
  "/register",
  withAsync( async (req, res, next) => {
    const { email, password, firstname, lastname } = req.body
    const salt = generateSalt()

    const auth = await model.Auth.create({
      email: email,
      salt: salt,
      password: generatePassword(password, salt)
    })

    // Error handler here... if ok -> next, but....
    const user = await model.User.create({
      id: auth.id,
      firstname: firstname,
      lastname: lastname
    })
    // And here

    return res.status(201).json({
      error: false,
      data: {
        id: user.id, //Mb we shouldnt send that
      },
      message: "New user has been created."
    })
  })
)

module.exports = router
