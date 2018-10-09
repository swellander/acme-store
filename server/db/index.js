const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-store', { logging: false })

const Product = conn.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    uinique: true,
    validate: {
      notEmpty: true
    }
  }
});

const Order = conn.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true
  },
  status: {
    type: Sequelize.ENUM('CART', 'ORDER'),
    allowNull: false,
    defaultValue: 'CART'
  }
});

const LineItem = conn.define('lineItem', {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  }
});

//ASSOCIATIONS
//======================================
Product.hasMany(LineItem);
LineItem.belongsTo(Product);
Order.hasMany(LineItem);
LineItem.belongsTo(Order);

const syncSeed = async () => {
  await conn.sync({ force: true })
  const [orderOne, orderTwo, orderThree] = await Promise.all([
    Order.create({ status: 'CART' }),
    Order.create({ status: 'ORDER' }),
  ]);
  const [drone, trampoline, trebuche] = await Promise.all([
    Product.create({ name: 'Drone' }),
    Product.create({ name: 'Trampoline' }),
    Product.create({ name: 'Trebuche' }),
  ])
  const [itemOne, itemTwo, itemThree] = await Promise.all([
    LineItem.create({ productId: 1 }),
    LineItem.create({ productId: 2 }),
    LineItem.create({ productId: 3 })
  ]);

  itemOne.setProduct(drone);
  itemOne.setOrder(orderOne);
  itemTwo.setProduct(trampoline);
  itemTwo.setOrder(orderOne);
  itemThree.setProduct(trebuche);
}

module.exports = {
  syncSeed,
  models: {
    Product,
    Order,
    LineItem
  }
}