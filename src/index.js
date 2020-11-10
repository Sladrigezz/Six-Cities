import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import mock from './mocks/offers.js';

const init = () => {
  ReactDOM.render(
      <App
        data={mock}
      />, document.getElementById(`root`)
  );
};

init();
