require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const busboy = require('connect-busboy');
const busboyBodyParser = require('busboy-body-parser');
const uploadRouter = require('./upload/upload')
const userRouter = require('./user/user-router')
const songRouter = require('./song/song-router')
const likesRouter = require('./likes/likes-router')
const authRouter = require('./auth/auth-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors({ origin: '*' }))
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(helmet())

app.use(busboy())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(busboyBodyParser());

app.use('/api/upload', uploadRouter)
app.use('/api/users', userRouter)
app.use('/api/songs', songRouter)
app.use('/api/likes', likesRouter)
app.use('/api/auth', authRouter)

app.get('/', (req, res) => {
  res.send('Hello, world!')
})


app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})


module.exports = app