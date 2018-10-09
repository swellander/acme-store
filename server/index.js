const app = require('./app');
const { syncSeed } = require('./db');
const port = process.env.PORT || 5000;

const init = () => {
  syncSeed()
    .then(() => app.listen(port, () => console.log('Listening on port', port)))
    .catch(err => console.log(err))
}
init();