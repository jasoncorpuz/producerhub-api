const express = require('express')
const SongService = require('./song-service')
const requireAuth = require('../middleware/jwt-auth')

const songRouter = express.Router()
const jsonBodyParser = express.json()

// get all songs, songs by id

songRouter
  .get('/', (req, res, next) => {
    const { order } = req.query
    const knex = req.app.get('db')

    if (order === 'newest') {
      SongService.getNewestSongs(knex)
      .then(songs => res.json(songs))
      .catch(next)
    }
    SongService.getAllSongs(knex)
      .then(songs => res.json(songs))
      .catch(next)
  })

songRouter
  .get('/:id', (req, res, next) => {
    const knex = req.app.get('db')
    const id = req.params.id

    SongService.getSongById(knex, id)
      .then(song => {
        if (song.length === 0) {
          return res.status(404).json({
            error: "song not found"
          })
        }
        res.send(song)
      })
      .catch(next)
  })

songRouter
  .get('/user/:userId', (req, res, next) => {
    const knex = req.app.get('db')
    const userId = req.params.userId

    SongService.getSongByUser(knex, userId)
      .then(song => {
        if (song.length === 0) {
          return res.status(404).json({
            error: "song not found"
          })
        }
        res.send(song)
      })
      .catch(next)
  })

songRouter
  .route('/')
  .all(requireAuth)
  .post((req, res, next) => {
    const knex = req.app.get('db')
    const userId = req.user.id
    const { title, description, location } = req.body

    const newSong = {
      title: title,
      description: description,
      location: location,
      user_id: userId
    }

    SongService.postSong(knex, newSong)
      .then(song => {
        return res.status(201).json({
          song
        })
      })

  })


module.exports = songRouter