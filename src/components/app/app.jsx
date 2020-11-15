import {Switch, Route} from 'react-router-dom';
import React from 'react';

import MainPage from '../main-page/main-page.jsx';
import OfferDetail from '../offer-detail/offer-detail.jsx';
import MainEmpty from '../main-emtpy/main-empty.jsx';
import login from '../login/login.jsx';
import Favorites from '../favorites/favorites.jsx';
import {FavoritesEmpty} from '../favorites-empty/favorites-empty.jsx';

export function App() {
  return (
    <Switch>
      <Route path={`/`} component={MainPage} exact />
      <Route path={`/login`} component={login} exact />
      <Route path={`/offer/:id`} component={OfferDetail} exact />
      <Route path={`/offers-not-found`} component={MainEmpty} exact />
      <Route path={`/favorites`} component={Favorites} exact />
      <Route path={`/favorites-not-found`} component={FavoritesEmpty} exact />
    </Switch>
  );

}
