const request = require('supertest')
const app = require('../src/index')

describe('Microservice-1 API', () => {
  describe('GET /api/health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/api/health')
        .expect(200)

      expect(response.body).toHaveProperty('status', 'healthy')
      expect(response.body).toHaveProperty('service', 'microservice-1')
    })
  })

  describe('POST /api/items', () => {
    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/items')
        .send({})
        .expect(400)

      expect(response.body).toHaveProperty('error', 'Validation error')
    })

    it('should accept valid item data', async () => {
      const itemData = {
        title: 'Test Item',
        description: 'Test Description'
      }

      const response = await request(app)
        .post('/api/items')
        .send(itemData)
        .expect(201)

      expect(response.body).toHaveProperty('message')
      expect(response.body.item).toHaveProperty('title', 'Test Item')
    })
  })
})
