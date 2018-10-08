const { expect } = require('chai');
const { syncSeed, models } = require('../server/db');
const { Order } = models;

describe('Order model', () => {
  beforeEach(() => {
    return syncSeed();
  })
  it('exists', () => {
    expect(Order).to.be.ok;
    return Order.findAll()
      .then(orders => expect(orders.length).to.equal(3))
  });

  it('has a status', () => {
    return Order.findAll()
      .then(orders => {
        expect(orders[0].status).to.be.ok;
      })
  });
  it('status cannot be null', () => {
    return Order.create({ status: null })
      .catch(err => {
        expect(err.name).to.equal('SequelizeValidationError')
      })
  });
})