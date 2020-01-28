const express = require('express')
const path = require('path')
const UsersService = require('./user-service')

const userRouter = express.Router()
const jsonBodyParser = express.json()

userRouter
  .get('/', (req,res,next) => {
    UsersService.getAllUsers(req.app.get('db'))
     .then(rec => res.json(rec))
     .catch(next)
  })
  .post('/', jsonBodyParser, (req, res, next) => {
    const { password, username } = req.body

    for (const field of ['username', 'password'])
      if (!req.body[field])
        return res.status(400).json({
          error: `Missing '${field}' in request body`
        })

    const passwordError = UsersService.validatePassword(password)

    if (passwordError)
      return res.status(400).json({ error: passwordError })

    UsersService.hasUserWithUserName(
      req.app.get('db'),
      username
    )
      .then(hasUserWithUserName => {
        if (hasUserWithUserName)
          return res.status(400).json({ error: `Username already taken` })

        return UsersService.hashPassword(password)
          .then(hashedPassword => {
            const newUser = {
              username,
              password: hashedPassword
            }

            return UsersService.insertUser(
              req.app.get('db'),
              newUser
            )
              .then(user => {
                res
                  .status(201)
                  .location(path.posix.join(req.originalUrl, `/${user.id}`))
                  .json(UsersService.serializeUser(user))
              })
          })
      })
      .catch(next)
  })

  userRouter
   .get('/:id', (req,res,next) => {
     UsersService.getUserbyId(req.app.get('db'), req.params.id)
      .then(user => {
        if(user.length === 0) {
          return res.status(404).json({
            error: "User not found"
          })
        }
        res.send(user)
      })
      .catch(next)
   })


module.exports = userRouter