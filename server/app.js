const express = require('express');
const app = express();

// app.use((req, res, next) => {
//   console.log(req.method, req.url);
//   next()
// });

app.use(express.json());
app.use('/api', require('./routes'))

app.get('/', (req, res, next) => {
  res.send('<h1>hey</h1>')
})

module.exports = app;