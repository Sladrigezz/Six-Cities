import {connect} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';

import MainPage from '../main-page/main-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';

export class App extends React.PureComponent {
  render() {
    const getScreen = () => {
      const {isAuthorizationRequired} = this.props;

      return isAuthorizationRequired ? <SignIn /> : <MainPage />;
    };

    return getScreen();
  }
}

App.propTypes = {
  isAuthorizationRequired: PropTypes.bool,
};

export default connect(
    (state) => ({
      isAuthorizationRequired: state.user.isAuthorizationRequired,
    })
)(App);
