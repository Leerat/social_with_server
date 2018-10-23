const express = require("express")
const router = express.Router()

const model = require("../models/index")
const withAsync = require("../utils/utils").withAsync

/* GET users listing. */
router.get(
  '/',
  withAsync(async (req, res, next) => {
    const users = await model.User.findAll({
      order: [
        ['id', 'DESC']
      ]
    })
    return res.json({
      error: false,
      data: users
    })
  })
)

router.get(
  '/:id',
  withAsync(async (req, res, next) => {
    const userId = req.params.id
    const user = await model.User.findOne({where: {id: userId}})
    return res.json({
      error: false,
      data: user
    })
  })
)

router.put(
  '/:id',
  withAsync(async (req, res, next) => {
    const userId = req.params.id
    const data = req.body
    const options = {
      where: {
        id: userId
      },
      returning: true
    }

    const user = await model.User.update(data, options)
    const isCorrect = user[0] === 1

    if(isCorrect) {
      return res.status(201).json({
        error: false,
        data: user[1][0],
        massage: 'User data updated'
      })
    } else {
      return res.status(404).json({
        error: true,
        message: "There isn't such user",
      })
    }
  })
)

module.exports = router;
