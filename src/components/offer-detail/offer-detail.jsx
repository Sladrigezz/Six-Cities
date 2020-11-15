import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {find, propEq} from 'ramda';

import {getOffer, getReviewList, getFilteredOffers, getClosestOffers, getReviews} from '../../selectors/data.js';
import {Logo} from '../logo/logo.jsx';
import {loadOffers} from '../../reducers/data.js';
import {startUpOffers} from '../../reducers/user.js';
import {ActionCreator} from '../../reducers/index.js';
import {CardTypes, BookmarkActions} from '../../constants/constants.js';
import {ReviewsList} from '../reviews-list/reviews-list.jsx';
import {loadReviews} from '../../reducers/data';
import {MapSection} from '../map/map.jsx';
import {CardOffer} from '../card-offer/card-offer.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import {getIsAuthRequired} from '../../selectors/user.js';
import SignIn from '../sign-in/sign-in.jsx';

export class OfferDetail extends PureComponent {
  render() {
    const {offer, reviews, reviewList, closestOffers, filteredOffers, isAuthRequired} = this.props;
    const ratingPercent = offer && (Math.round(offer.rating) / 5) * 100;

    const handleBookmarkClick = () => {
      const {ADD, REMOVE} = BookmarkActions;
      const status = offer.is_favorite ? REMOVE : ADD;
      const {addToFavorite, match} = this.props;
      addToFavorite(match.params.id, status);
    };

    return offer ? (
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

          <main className="page__main page__main--property">
            <section className="property">
              <div className="property__gallery-container container">
                <div className="property__gallery">
                  {offer.images.map((item) => {
                    return (
                      <div className="property__image-wrapper" key={item}>
                        <img className="property__image" src={item} alt="Photo studio" />
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="property__container container">
                <div className="property__wrapper">
                  {offer.is_premium && (<div className="property__mark">
                    <span>Premium</span>
                  </div>)}
                  <div className="property__name-wrapper">
                    <h1 className="property__name">
                      {offer.title}
                    </h1>
                    <button
                      style={{position: `absolute`, top: `41px`, right: `93px`}}
                      className={`place-card__bookmark-button place-card__bookmark-button${offer.is_favorite ? `--active` : ``} button`}
                      type="button"
                      onClick={handleBookmarkClick}
                    >
                      <svg className="place-card__bookmark-icon" width="31" height="33">
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">In bookmarks</span>
                    </button>
                  </div>
                  <div className="property__rating rating">
                    <div className="property__stars rating__stars">
                      <span style={{width: `${ratingPercent}%`}}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                    <span className="property__rating-value rating__value">{Math.round(offer.rating)}</span>
                  </div>
                  <ul className="property__features">
                    <li className="property__feature property__feature--entire">
                      {offer.type}
                    </li>
                    <li className="property__feature property__feature--bedrooms">
                      {`${offer.bedrooms} ${offer.bedrooms > 1 ? `bedrooms` : `bedroom`}`}
                    </li>
                    <li className="property__feature property__feature--adults">
                      {`Max ${offer.max_adults} adult${offer.max_adults > 1 ? `s` : ``}`}
                    </li>
                  </ul>
                  <div className="property__price">
                    <b className="property__price-value">&euro;{offer.price}</b>
                    <span className="property__price-text">&nbsp;night</span>
                  </div>
                  <div className="property__inside">
                    <h2 className="property__inside-title">What&apos;s inside</h2>
                    <ul className="property__inside-list">
                      {offer.goods.map((item, i) => {
                        return (
                          <li key={i} className="property__inside-item">
                            {item}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="property__host">
                    <h2 className="property__host-title">Meet the host</h2>
                    <div className="property__host-user user">
                      <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                        <img className="property__avatar user__avatar" src={`../${offer.host.avatar_url}`} width="74" height="74" alt="Host avatar" />
                      </div>
                      <span className="property__user-name">
                        Angelina
                      </span>
                      <span className="property__user-status">
                        Pro
                      </span>
                    </div>
                    <div className="property__description">
                      <p className="property__text">{offer.description}</p>
                    </div>
                  </div>
                  <section className="property__reviews reviews">
                    <h2
                      className="reviews__title"
                    >
                      Reviews &middot;
                      <span className="reviews__amount">
                        {reviews && reviews.length}
                      </span>
                    </h2>
                    <ReviewsList reviews={reviewList} />
                    {!isAuthRequired && (<ReviewForm />)}
                  </section>
                </div>
              </div>
              <section className="property__map map">
                <MapSection offers={closestOffers} city={offer.city} currentOffer={offer} />

              </section>
            </section>
            <div className="container">
              <section className="near-places places">
                <h2 className="near-places__title">Other places in the neighbourhood</h2>
                <div className="near-places__list places__list">
                  {closestOffers && closestOffers.map((item) => {
                    const offerItem = find(propEq(`id`, item.id))(filteredOffers);
                    return <CardOffer
                      onBookmarkClick={handleBookmarkClick}
                      offer={offerItem}
                      key={offerItem.id}
                      cardType={CardTypes.NEAR_PLACES}
                    />;
                  })}
                </div>
              </section>
            </div>
          </main>
        </div>
      </>
    ) : <div />;
  }

  componentDidMount() {
    const {loadOffersList, match, loadOfferReviews, setActiveOffer, setDefaultSettings, checkAuthorization} = this.props;
    checkAuthorization();
    setDefaultSettings();
    loadOfferReviews(match.params.id);
    setActiveOffer(Number(match.params.id));
    loadOffersList(Number(match.params.id));
  }

  componentDidUpdate(prevProps) {
    const {loadOffersList, match, loadOfferReviews, setActiveOffer, setDefaultSettings} = this.props;
    if (prevProps.match.params.id !== this.props.match.params.id) {
      setDefaultSettings();
      loadOfferReviews(match.params.id);
      setActiveOffer(Number(match.params.id));
      loadOffersList(Number(match.params.id));
    }
  }

  componentWillUnmount() {
    const {setActiveOffer} = this.props;
    setActiveOffer(null);
  }
}

OfferDetail.propTypes = {
  isAuthRequired: PropTypes.bool,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    })
  }),
  offer: PropTypes.object,
  reviews: PropTypes.array,
  reviewList: PropTypes.array,
  filteredOffers: PropTypes.array,
  closestOffers: PropTypes.array,
  loadOffersList: PropTypes.func,
  setDefaultSettings: PropTypes.func,
  loadOfferReviews: PropTypes.func,
  setActiveOffer: PropTypes.func,
  checkAuthorization: PropTypes.func,
  addToFavorite: PropTypes.func,
};

export default connect(
    (state, ownProps) => ({
      offer: getOffer(state, ownProps.match.params.id),
      filteredOffers: getFilteredOffers(state),
      reviewList: getReviewList(state),
      reviews: getReviews(state),
      closestOffers: getClosestOffers(state),
      isAuthRequired: getIsAuthRequired(state),
    }),
    (dispatch, ownProps) => ({
      addToFavorite: (id, status) => dispatch(ActionCreator.addToFavorite(id, status)),
      loadOffersList: (id) => dispatch(loadOffers(id)),
      setDefaultSettings: () => dispatch(startUpOffers()),
      loadOfferReviews: () => dispatch(loadReviews(ownProps.match.params.id)),
      setActiveOffer: (id) => dispatch(ActionCreator.setActiveOffer(id)),
      checkAuthorization: () => dispatch(ActionCreator.checkAuthorization()),
    })
)(OfferDetail);
