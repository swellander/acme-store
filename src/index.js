import React from 'react';
import { render } from 'react-dom';
import Main from './components/Main';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

const App = () => (
  <Provider store={store}>
    <Router>
      <Main />
    </Router>
  </Provider>
);

render(<App />, document.getElementById('app'));