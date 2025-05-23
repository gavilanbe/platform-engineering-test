require('dotenv').config()

module.exports = {
  port: process.env.PORT || 8081,
  nodeEnv: process.env.NODE_ENV || 'development',
  googleCloud: {
    projectId: process.env.GOOGLE_CLOUD_PROJECT || 'platform-test-dev',
    subscription: process.env.PUBSUB_SUBSCRIPTION || 'item-events-subscription',
    firestoreCollection: process.env.FIRESTORE_COLLECTION || 'items'
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000'
  }
}
