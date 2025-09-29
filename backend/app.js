const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const morgan  = require('morgan')
// const cors = require('cors') // only use if frontend and backend are hosted separately
const app = express()
require('dotenv').config()

const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')
const workoutsRouter = require('./controllers/workouts')
const exercisesRouter = require('./controllers/exercises')

mongoose.set('strictQuery', false)

logger.info('connecting to', config.MONGODB_URI)
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(express.json())
app.use(express.static('dist'))
// app.use(cors)
app.use(morgan('tiny'))
app.use(middleware.requestLogger)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/workouts', workoutsRouter)
app.use('/api/exercises', exercisesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app