const express = require('express')
const itemRoutes = require('./items')
const itemController = require('../controllers/itemController')

const router = express.Router()

router.use('/items', itemRoutes)
router.get('/health', itemController.healthCheck)

module.exports = router
