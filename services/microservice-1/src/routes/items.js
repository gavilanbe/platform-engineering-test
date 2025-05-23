const express = require('express')
const itemController = require('../controllers/itemController')
const { validateItem } = require('../middleware/validation')

const router = express.Router()

router.get('/', itemController.getItems)
router.post('/', validateItem, itemController.createItem)

module.exports = router
