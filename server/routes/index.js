const router = require('express').Router();
const { Order, Product, LineItem } = require('../db').models;

router.get('/products', (req, res, next) => {
  Product.findAll({
    include: [LineItem]
  })
    .then(products => {
      res.json(products);
    })
    .catch(next);
});
router.post('/products', (req, res, next) => {
  Product.create(req.body)
    .then(newProduct => {
      res.status(201);
      res.json(newProduct);
    })
    .catch(next);
});

//TODO: think about how to write this route with a promise chain
router.get('/orders', async (req, res, next) => {
  try {
    const cart = await Order.findOne({
      where: {
        status: 'CART'
      }
    });
    if (!cart) await Order.create({})
    const orders = await Order.findAll({
      include: [LineItem]
    })
    res.json(orders);
  } catch (ex) {
    console.log('Something went wrong in the GET /api/orders route')
    next(ex);
  }
});
router.put('/orders/:id', (req, res, next) => {
  Order.findById(req.params.id)
    .then(order => order.update(req.body))
    .then(updatedOrder => {
      res.json(updatedOrder);
    })
    .catch(next);
})
router.post('/orders/:orderId/lineItems', (req, res, next) => {
  LineItem.create({
    orderId: req.params.orderId,
    ...req.body
  })
    .then(newLineItem => {
      res.status(201).json(newLineItem)
    })
    .catch(next);
});
router.put('/orders/:orderId/lineItems/:id', (req, res, next) => {
  LineItem.findById(req.params.id)
    .then(lineItem => lineItem.update(req.body))
    .then(updatedLineItem => res.status(201).json(updatedLineItem))
})
router.delete('/orders/:orderId/lineItems/:id', (req, res, next) => {
  //QUESTION: why is orderId needed here?
  LineItem.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.sendStatus(202))
    .catch(next)
});

module.exports = router;