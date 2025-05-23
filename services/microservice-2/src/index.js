const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const compression = require('compression')
const morgan = require('morgan')

const config = require('./config')
const itemController = require('./controllers/itemController')
const pubsubSubscriber = require('./services/pubsubSubscriber')

const app = express()

// Security middleware
app.use(helmet())
app.use(cors({
  origin: config.cors.origin,
  credentials: true
}))

// General middleware
app.use(compression())
app.use(morgan('combined'))
app.use(express.json())

// Routes
app.get('/api/items', itemController.getItems)
app.get('/api/items/:id', itemController.getItemById)
app.get('/api/health', itemController.healthCheck)

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.originalUrl} not found`
  })
})

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    error: 'Internal Server Error',
    message: config.nodeEnv === 'development' ? err.message : 'Something went wrong'
  })
})

const server = app.listen(config.port, async () => {
  console.log(`🚀 Microservice-2 running on port ${config.port}`)
  console.log(`📊 Environment: ${config.nodeEnv}`)
  console.log(`☁️ Google Cloud Project: ${config.googleCloud.projectId}`)

  // Start Pub/Sub listener
  try {
    await pubsubSubscriber.startListening()
  } catch (error) {
    console.error('Failed to start Pub/Sub listener:', error)
  }
})

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully')
  server.close(() => {
    console.log('Process terminated')
  })
})

module.exports = app
