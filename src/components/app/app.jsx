import {connect} from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import MainPage from '../main-page/main-page.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import OfferDetail from '../offer-detail/offer-detail.jsx';

export class App extends React.PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={`/`} component={MainPage} exact />
          <Route path={`/login`} component={SignIn} exact />
          <Route path={`/offer/:id`} component={OfferDetail} exact />
        </Switch>
      </BrowserRouter>
    );
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
