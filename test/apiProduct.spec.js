
const { expect } = require('chai');
const { models, syncSeed } = require('../server/db');
const { Product } = models;
const request = require('supertest');
const app = request(require('../server/app'));

describe('Products api route', () => {
  beforeEach(() => syncSeed())
  it('returns list of products and their associated line items', () => {
    return app.get('/api/products')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(response => response.body)
      .then(products => {
        expect(products.length).to.equal(3);
        expect(products[0].lineItems.length).to.equal(1);
      });
  });
  it('can create new products', () => {
    const newProduct = { name: 'YubiKey 5C' }
    return app.post('/api/products')
      .send(newProduct)
      .expect(201)
      .expect('Content-Type', /json/)
      .then(response => response.body)
      .then(newProduct => {
        expect(newProduct.name).to.equal('YubiKey 5C')
      })
      .then(() => {
        return app.get('/api/products')
      })
      .then(response => response.body)
      .then(products => expect(products.length).to.equal(4))
  })
})