const { expect } = require('chai');
const { syncSeed, models } = require('../server/db');
const { Product } = models;

describe('Product model', () => {
  beforeEach(() => {
    return syncSeed();
  })
  it('exists', () => {
    expect(Product).to.be.ok;
    return Product.findAll()
      .then(products => expect(products.length).to.equal(3))
  });

  it('have a name', () => {
    return Product.findAll()
      .then(products => {
        expect(JSON.stringify(products).includes('Drone')).to.be.true;
      })
  });
  it('cannot be null', () => {
    return Product.create({})
      .catch(err => {
        expect(err.name).to.equal('SequelizeValidationError')
      })
  });
  it('must have unique name', () => {
    Product.create({ name: 'Shoes' })
      .then(() => {
        return Product.create({ name: 'Shoes' })
      })
      //QUESTION: Is this an ok way to test for expected errors?
      .catch(err => expect(err.name).to.equal('SequelizeValidationError'))
  });
  it('cannot be empty', () => {
    Product.create({ name: '' })
      .catch(err => expect(err.name).to.equal('SequelizeValidationError'))
  })
})