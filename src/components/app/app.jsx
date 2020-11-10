import React from 'react';
import PropTypes from 'prop-types';
import MainPage from '../main-page/main-page.jsx';

const App = (props) => {
  const {data} = props;

  return <MainPage
    offers={data}
  />;
};

App.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default App;
