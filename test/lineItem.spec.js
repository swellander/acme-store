const { expect } = require('chai');
const { syncSeed, models } = require('../server/db');
const { LineItem } = models;

describe('LineItem model', () => {
  beforeEach(() => {
    return syncSeed();
  })
  it('has a quantity', () => {
    return LineItem.findOne()
      .then(item => {
        expect(item.quantity).be.ok
        expect(item.quantity).to.equal(1)
      })
  })
  it('belongs to a product', () => {
    return LineItem.findAll()
      .then(lineItems => {
        lineItems.forEach(lineItem => {
          expect(lineItem.productId).to.be.ok;
        })
      })
  });
})