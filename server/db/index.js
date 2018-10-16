const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-store', { logging: false })

//MODELS
//================================================
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
  const [drone, trampoline, trebuche] = await Promise.all([
    Product.create({ name: 'Drone' }),
    Product.create({ name: 'Trampoline' }),
    Product.create({ name: 'Trebuchet' }),
  ]);
}

module.exports = {
  syncSeed,
  models: {
    Product,
    Order,
    LineItem
  }
}