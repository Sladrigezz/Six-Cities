import React from 'react';
import ReactDOM from 'react-dom';
import {Router} from 'react-router-dom';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {compose} from 'recompose';

import {App} from './components/app/app.jsx';
import reducer from './reducers/index.js';
import createAPI from './api/api.js';
import history from './history/history.js';

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
    reducer,
    compose(
      applyMiddleware(thunk.withExtraArgument(api)),
      window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f) => f
    )
  );

  ReactDOM.render(
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>,
    document.querySelector(`#root`)
  );
};

init();
