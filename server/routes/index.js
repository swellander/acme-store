const router = require('express').Router();
const { Product, LineItem } = require('../db').models;

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
})

module.exports = router;