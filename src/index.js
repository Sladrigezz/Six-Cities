import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

import App from './components/app/app.jsx';
import mock from './mocks/offers.js';

import reducer from './reducer';

const store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const init = () => {
  ReactDOM.render(
      <Provider store={store}>
        <App
          data={mock}
        />
      </Provider>
      , document.getElementById(`root`)
  );
};

init();
