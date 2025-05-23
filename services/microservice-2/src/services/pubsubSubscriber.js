const { PubSub } = require('@google-cloud/pubsub')
const config = require('../config')
const firestoreService = require('./firestoreService')

class PubSubSubscriber {
  constructor () {
    this.pubsub = new PubSub({
      projectId: config.googleCloud.projectId
    })
    this.subscriptionName = config.googleCloud.subscription
  }

  async startListening () {
    try {
      const subscription = this.pubsub.subscription(this.subscriptionName)

      console.log(`🎧 Listening for messages on ${this.subscriptionName}`)

      subscription.on('message', this.handleMessage.bind(this))
      subscription.on('error', this.handleError.bind(this))

      return subscription
    } catch (error) {
      console.error('Error starting Pub/Sub listener:', error)
      throw error
    }
  }

  async handleMessage (message) {
    try {
      const data = JSON.parse(message.data.toString())
      console.log(`📨 Received message: ${data.eventType}`)

      switch (data.eventType) {
        case 'item.created':
          await this.handleItemCreated(data.data)
          break
        default:
          console.log(`Unknown event type: ${data.eventType}`)
      }

      message.ack()
    } catch (error) {
      console.error('Error processing message:', error)
      message.nack()
    }
  }

  async handleItemCreated (itemData) {
    try {
      console.log(`💾 Saving item to Firestore: ${itemData.title}`)
      await firestoreService.saveItem(itemData)
      console.log(`✅ Item saved successfully: ${itemData.id}`)
    } catch (error) {
      console.error('Error handling item created event:', error)
      throw error
    }
  }

  handleError (error) {
    console.error('Pub/Sub subscription error:', error)
  }
}

module.exports = new PubSubSubscriber()
