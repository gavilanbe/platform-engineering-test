const firestoreService = require('../services/firestoreService')

class ItemController {
  async getItems (req, res, next) {
    try {
      const items = await firestoreService.getItems()
      res.json(items)
    } catch (error) {
      next(error)
    }
  }

  async getItemById (req, res, next) {
    try {
      const { id } = req.params
      const item = await firestoreService.getItemById(id)

      if (!item) {
        return res.status(404).json({
          error: 'Item not found'
        })
      }

      res.json(item)
    } catch (error) {
      next(error)
    }
  }

  async healthCheck (req, res) {
    res.json({
      status: 'healthy',
      service: 'microservice-2',
      timestamp: new Date().toISOString(),
      version: require('../../package.json').version
    })
  }
}

module.exports = new ItemController()
