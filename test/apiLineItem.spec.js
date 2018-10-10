const { expect } = require('chai');
const { models, syncSeed } = require('../server/db');
const { LineItem, Order } = models;
const request = require('supertest');
const app = request(require('../server/app'));

describe('Line Item api routes', () => {
  beforeEach(() => syncSeed())
  describe('POST /api/orders/:orderId/lineItems', () => {
    it('can create a line item', () => {
      const newItem = {
        orderId: 1,
        productId: 1
      }
      return app.post(`/api/orders/1/lineItems`)
        .send(newItem)
        .expect(201)
        .then(response => response.body)
        .then(lineItem => {
          expect(lineItem.productId).to.equal(1);
          expect(lineItem.orderId).to.equal(1);
          expect(lineItem.quantity).to.equal(1);
        })
    })
  });
  describe('DELETE /api/orders/:orderId/lineItems/:id', () => {
    it('can delete a line item', async () => {
      const startingLineItems = await LineItem.findAll();
      await app.delete('/api/orders/1/lineItems/1').expect(202)
      const endingLineItems = await LineItem.findAll();
      expect(startingLineItems.length).to.equal(endingLineItems.length + 1)
    })
  });
  describe('PUT /api/orders/:orderId/lineItems/:id', () => {
    it('can update a line item', async () => {
      const originalItem = await LineItem.findById(1);
      const updates = { quantity: originalItem.quantity + 8 };
      const { body } = await app.put('/api/orders/1/lineItems/1').send(updates).expect(201);
      expect(body.quantity).to.equal(originalItem.quantity + 8)
    })
  });
})

