const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const rateLimit = require('express-rate-limit')
const morgan = require('morgan')

const config = require('./config')
const routes = require('./routes')
const errorHandler = require('./middleware/errorHandler')

const app = express()

// Security middleware
app.use(helmet())
app.use(cors({
  origin: config.cors.origin,
  credentials: true
}))

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: 'Too many requests from this IP'
})
app.use(limiter)

// General middleware
app.use(compression())
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', routes)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  })
})

// Error handler
app.use(errorHandler)

const server = app.listen(config.port, () => {
  console.log(`🚀 Microservice-1 running on port ${config.port}`)
  console.log(`📊 Environment: ${config.nodeEnv}`)
  console.log(`☁️ Google Cloud Project: ${config.googleCloud.projectId}`)
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
  })
})

module.exports = app
