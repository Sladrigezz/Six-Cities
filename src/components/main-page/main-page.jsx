import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {isEmpty} from 'ramda';

import CardOffersList from '../card-offers-list/card-offers-list.jsx';
import {MapSection} from '../map/map.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import {loadOffers} from '../../reducers/data.js';
import {startUpOffers} from '../../reducers/user.js';
import {getResponseAuth} from '../../selectors/data.js';
import {Logo} from '../logo/logo.jsx';
import SortOffers from '../sort-offers/sort-offers.jsx';
import {getHoveredOffer} from '../../selectors/user.js';
import {ActionCreator} from '../../reducers/index.js';
import SignIn from '../sign-in/sign-in.jsx';

export class MainPage extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {filteredOffers, activeCity, hoveredOfferId} = this.props;
    const city = !isEmpty(filteredOffers) ? filteredOffers[0].city : {};

    return (
          <>
              <div style={{display: `none`}}>
                <svg xmlns="http://www.w3.org/2000/svg">
                  <symbol id="icon-arrow-select" viewBox="0 0 7 4">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 0l3.5 2.813L7 0v1.084L3.5 4 0 1.084V0z">
                    </path>
                  </symbol>
                  <symbol id="icon-bookmark" viewBox="0 0 17 18">
                    <path d="M3.993 2.185l.017-.092V2c0-.554.449-1 .99-1h10c.522 0 .957.41.997.923l-2.736 14.59-4.814-2.407-.39-.195-.408.153L1.31 16.44 3.993 2.185z">
                    </path>
                  </symbol>
                  <symbol id="icon-star" viewBox="0 0 13 12">
                    <path fillRule="evenodd" clipRule="evenodd" d="M6.5 9.644L10.517 12 9.451 7.56 13 4.573l-4.674-.386L6.5 0 4.673 4.187 0 4.573 3.549 7.56 2.483 12 6.5 9.644z">
                    </path>
                  </symbol>
                </svg>
              </div>

            <div className="page page--gray page--main">
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

              <main className="page__main page__main--index">
                <h1 className="visually-hidden">Cities</h1>
                <div className="tabs">
                  <CitiesList offers={filteredOffers} />
                </div>
                <div className="cities">
                  <div className="cities__places-container container">
                    <section className="cities__places places">
                      <h2 className="visually-hidden">Places</h2>
                      <b className="places__found">{filteredOffers.length} places to stay in {activeCity}</b>
                      <SortOffers />
                      <div className="cities__places-list places__list tabs__content">
                        <CardOffersList />
                      </div>
                    </section>
                    <div className="cities__right-section">
                      <section className="cities__map map">
                        <MapSection offers={filteredOffers} city={city} hoveredOfferId={hoveredOfferId} />
                      </section>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </>
    );
  }

  componentDidMount() {
    const {loadOffersList, setDefaultSettings, checkAuthorization} = this.props;
    checkAuthorization();
    loadOffersList();
    setDefaultSettings();
  }
}

MainPage.propTypes = {
  activeCity: PropTypes.string,
  cities: PropTypes.arrayOf(PropTypes.string),
  filteredOffers: PropTypes.array,
  hoveredOfferId: PropTypes.string,
  responseAuth: PropTypes.shape({
    email: PropTypes.string,
  }),
  setDefaultSettings: PropTypes.func,
  loadOffersList: PropTypes.func,
  checkAuthorization: PropTypes.func,
};

export default connect(
    (state) => ({
      filteredOffers: state.data.filteredOffers,
      activeCity: state.user.activeCity,
      responseAuth: getResponseAuth(state),
      hoveredOfferId: getHoveredOffer(state),
    }),
    (dispatch) => ({
      loadOffersList: () => dispatch(loadOffers()),
      setDefaultSettings: () => dispatch(startUpOffers()),
      checkAuthorization: () => dispatch(ActionCreator.checkAuthorization()),
    })
)(MainPage);
