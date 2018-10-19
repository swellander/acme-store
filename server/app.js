const express = require('express');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use('/api', require('./routes'))
app.use(express.static('public'))

app.use((req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return next();
  }
  let id;
  try {
    id = jwt.decode(token, process.env.JWT_SECRET).id;
  }
  catch (ex) {
    return next({ status: 401 });
  }
  User.findById(id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(next);
});

app.get('/', (req, res, next) => {
  res.send('<h1>hey</h1>')
})

module.exports = app;