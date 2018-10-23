const express = require("express")
const sequelize = require('sequelize')
const Op = require('sequelize').Op
const router = express.Router()

const model = require("../models/index")
const withAsync = require("../utils/utils").withAsync

router.get(
  '/',
  withAsync(async (req, res, next) => {
    const posts = await model.Post.findAll({
      order: [
        ['createdAt', 'DESC']
      ]
    })
    return res.json({
      error: false,
      data: posts
    })
  })
)

router.get(
  '/feed/:id',
  withAsync(async (req, res, next) => {
    const id = req.params.id

    const friends = await model.User.findAll({
      raw: true,
      where: {
        requestFromYou: {
          [Op.contains]: [id]
        }
      },
      attributes: ['id','postsCreated', 'firstname', 'lastname']
    })
    const flat = friends.reduce( (acc, item) => acc.concat(item.postsCreated), [])

    const posts = await model.Post.findAll({
      raw: true,
      where: {
        id: flat
      },
      order: [
        ['createdAt', 'DESC']
      ],
    })
    const getAuthorName = id => {
      const friend = friends.find( item => item.id == id )
      return {
        firstname: friend.firstname,
        lastname: friend.lastname
      }
    }
    const feed = posts.map( post => Object.assign(post, {authorName: getAuthorName(post.author)} ))

    return res.json({
      error: false,
      data: feed,
    })
  })
)

router.post(
  '/',
  withAsync(async (req, res, next) => {
    const { text, author } = req.body

    const post = await model.Post.create({
      author: author,
      text: text
    })

    const user = await model.User.update({
      postsCreated: sequelize.fn('array_append', sequelize.col('postsCreated'), post.id)
    }, {
      where: {
        id: author
      }
    })
    console.log('---', user)

    return res.status(201).json({
      error: false,
      data: post,
      message: "New post has been created."
    })
  })
)

module.exports = router
