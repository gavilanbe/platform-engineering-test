require('dotenv').config()

module.exports = {
  port: process.env.PORT || 8080,
  nodeEnv: process.env.NODE_ENV || 'development',
  googleCloud: {
    projectId: process.env.GOOGLE_CLOUD_PROJECT || 'platform-test-dev',
    pubsubTopic: process.env.PUBSUB_TOPIC || 'item-events'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
  },
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX) || 100
  }
}
