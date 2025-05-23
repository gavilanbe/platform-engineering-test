const { Firestore } = require('@google-cloud/firestore')
const config = require('../config')

class FirestoreService {
  constructor () {
    this.db = new Firestore({
      projectId: config.googleCloud.projectId
    })
    this.collection = config.googleCloud.firestoreCollection
  }

  async saveItem (item) {
    try {
      const docRef = this.db.collection(this.collection).doc(item.id)
      await docRef.set({
        ...item,
        updatedAt: new Date().toISOString()
      })

      console.log(`Item saved to Firestore: ${item.id}`)
      return item
    } catch (error) {
      console.error('Error saving item to Firestore:', error)
      throw error
    }
  }

  async getItems () {
    try {
      const snapshot = await this.db.collection(this.collection)
        .orderBy('createdAt', 'desc')
        .get()

      const items = []
      snapshot.forEach(doc => {
        items.push({
          id: doc.id,
          ...doc.data()
        })
      })

      return items
    } catch (error) {
      console.error('Error fetching items from Firestore:', error)
      throw error
    }
  }

  async getItemById (id) {
    try {
      const doc = await this.db.collection(this.collection).doc(id).get()

      if (!doc.exists) {
        return null
      }

      return {
        id: doc.id,
        ...doc.data()
      }
    } catch (error) {
      console.error('Error fetching item from Firestore:', error)
      throw error
    }
  }
}

module.exports = new FirestoreService()
