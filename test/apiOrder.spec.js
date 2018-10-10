const { expect } = require('chai');
const { models, syncSeed } = require('../server/db');
const { Order } = models;
const request = require('supertest');
const app = request(require('../server/app'));

describe('/api/orders', () => {
  beforeEach(() => syncSeed());

  it('returns a list of all orders and their line items', () => {
    return app.get('/api/orders')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => response.body)
      .then(orders => {
        expect(orders.length).to.equal(2)
        expect(orders[0].lineItems.length).to.equal(2)
      });
  });
  it('it creates an initial order with a status of "CART" if there are no carts in db', () => {
    return Order.truncate({ cascade: true, where: {} })
      .then(() => {
        return app.get('/api/orders')
          .expect(200)
      })
      .then(response => response.body)
      .then(orders => {
        const initialOrder = orders[0];
        expect(initialOrder.status).to.equal('CART')
      });
  });
  describe('PUT /api/orders/:id', () => {
    it('can update an order', () => {
      return Order.create({})
        .then(newOrder => {
          return app.put(`/api/orders/${newOrder.id}`)
            .send({ status: 'ORDER' })
            .expect(200)
            .expect('Content-Type', /json/)
        })
        .then(response => {
          return response.body
        })
        .then(updatedOrder => {
          expect(updatedOrder.status).to.equal('ORDER')
        })
    })
  })
});
