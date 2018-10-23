const express = require("express")
const Op = require('sequelize').Op
const router = express.Router()

const seq = require("../models/index")
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

    const friends = await seq.User.findAll({
      raw: true,
      where: {
        [Op.or]: {
          requestFromYou: {
            [Op.contains]: [id]
          },
          id: id
        }
      },
      attributes: ['id','postsCreated', 'firstname', 'lastname']
    })
    const flat = friends.reduce( (acc, item) => acc.concat(item.postsCreated), [id])

    const posts = await seq.Post.findAll({
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

    const post = await seq.Post.create({
      author: author,
      text: text
    }, {
      returning: true,
      raw: true,
    })

    const user = await seq.User.update(
      { postsCreated: seq.sequelize.fn('array_append', seq.sequelize.col('postsCreated'), post.get().id) },
      {
        raw: true,
        returning: true,
        where: {
          id: author
        }
      }
    )
    const data = Object.assign(post.get(), {authorName: {firstname: user[1][0].firstname, lastname: user[1][0].lastname}})

    return res.status(201).json({
      error: false,
      data: data,
      message: "New post has been created."
    })
  })
)

module.exports = router
