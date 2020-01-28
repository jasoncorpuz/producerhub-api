const express = require('express')
const LikesService = require('./like-service')

const likesRouter = express.Router()

likesRouter 
    .get('/', (req,res,next) => {
        const knex = req.app.get('db')

        LikesService.getAllLikes(knex)
         .then(likes => res.json(likes))
    })

likesRouter
    .get('/user/:userId', (req, res, next) => {
        const knex = req.app.get('db')
        const userId = req.params.userId

        LikesService.getLikeByUser(knex, userId)
        .then(likes => {
            if (!likes.length) {
                return res.status(404).json({
                    error: "user not found"
                })
            }
            res.send(likes)
        })
        .catch(next)
    })

likesRouter
    .get('/song/:songId', (req, res, next) => {
        const knex = req.app.get('db')
        const songId = req.params.songId

        LikesService.getLikeBysSong(knex, songId)
        .then(likes => {
            if (!likes.length) {
                return res.status(404).json({
                    error: "song not found"
                })
            }
            res.send(likes)
        })
        .catch(next)
    })


module.exports = likesRouter