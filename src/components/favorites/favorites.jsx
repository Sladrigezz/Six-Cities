import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import {prop} from 'ramda';
import PropTypes from 'prop-types';

import {FavoriteCitySection} from '../favorite-city-section/favorite-city-section.jsx';
import {getFavoriteCities, getComposedFavoriteOffersOffers} from '../../selectors/data.js';
import {ActionCreator} from '../../reducers/index.js';
import {Logo} from '../logo/logo.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import history from '../../history/history.js';
import {getIsAuthRequired} from '../../selectors/user.js';

export class Favorites extends PureComponent {
  render() {
    const {favoriteCities, favoriteOffers, addToFavorite} = this.props;
    return (
      <>
        <div style={{display: `none`}}>
          <svg xmlns="http://www.w3.org/2000/svg"><symbol id="icon-arrow-select" viewBox="0 0 7 4"><path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z"></path></symbol><symbol id="icon-bookmark" viewBox="0 0 17 18"><path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z"></path></symbol><symbol id="icon-star" viewBox="0 0 13 12"><path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z"></path></symbol></svg>
        </div>

        <div className="page">
          <header className="header">
            <div className="container">
              <div className="header__wrapper">
                <div className="header__left">
                  <Logo />
                </div>
                <nav className="header__nav">
                  <ul className="header__nav-list">
                    <li className="header__nav-item user">
                      <SignIn />
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>

          <main className="page__main page__main--favorites">
            <div className="page__favorites-container container">
              <section className="favorites">
                <h1 className="favorites__title">Saved listing</h1>
                <ul className="favorites__list">
                  {favoriteCities && favoriteCities.map((city, i) => {
                    const offers = prop(city, favoriteOffers);
                    return <FavoriteCitySection onBookmarkClick={addToFavorite} key={i} city={city} offers={offers} />;
                  })}
                </ul>
              </section>
            </div>
          </main>
          <footer className="footer container">
            <Logo />
          </footer>
        </div>
      </>
    );
  }

  componentDidMount() {
    const {checkAuthorization, loadFavoriteOffers, isAuthRequired} = this.props;
    checkAuthorization();
    loadFavoriteOffers();
    return isAuthRequired && history.push(`/login`);
  }

  componentDidUpdate(prevProps) {
    const {loadFavoriteOffers, isAuthRequired} = this.props;
    if (prevProps.isAuthRequired !== this.props.isAuthRequired) {
      return isAuthRequired ? history.push(`/login`) : loadFavoriteOffers();
    }
    return null;
  }
}

Favorites.propTypes = {
  favoriteCities: PropTypes.array,
  favoriteOffers: PropTypes.object,
  isAuthRequired: PropTypes.bool,
  loadFavoriteOffers: PropTypes.func,
  checkAuthorization: PropTypes.func,
  addToFavorite: PropTypes.func,
};

export default connect(
    (state) => ({
      isAuthRequired: getIsAuthRequired(state),
      favoriteCities: getFavoriteCities(state),
      favoriteOffers: getComposedFavoriteOffersOffers(state),
    }),
    (dispatch) => ({
      addToFavorite: (id, status) => dispatch(ActionCreator.addToFavorite(id, status)),
      loadFavoriteOffers: () => dispatch(ActionCreator.loadFavoriteOffers()),
      checkAuthorization: () => dispatch(ActionCreator.checkAuthorization()),
    })
)(Favorites);
