const express = require('express')
const LikesService = require('./like-service')
const requireAuth = require('../middleware/jwt-auth')

const likesRouter = express.Router()

likesRouter
    .get('/', (req, res, next) => {
        const knex = req.app.get('db')

        LikesService.getAllLikes(knex)
            .then(likes => res.json(likes))
    })

likesRouter 
    .route('/:id')
    .delete((req,res,next) => {
        const likeId = req.params.id
        const knex = req.app.get('db')

        LikesService.deleteLike(knex,likeId)
         .then(numRowsAffect => {
             res.status(204).end()
         })
         .catch(next)
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
                    return res.status(204).json({
                        error: "No likes yet"
                    })
                }
                res.send(likes)
            })
            .catch(next)
    })

likesRouter
    .route('/song/:songId')
    .all(requireAuth)
    .post((req, res, next) => {
        const knex = req.app.get('db')
        const songId = req.params.songId
        const userId = req.user.id

        const like = {
            user_id: userId,
            song_id: songId
        }

        LikesService.postLike(knex, like)
            .then(r => {
                return res.status(200).json({
                    response: r
                })
            })
            .catch(next)
    })

module.exports = likesRouter