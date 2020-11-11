import React from 'react';
import leaflet from 'leaflet';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {isEmpty} from 'ramda';

export class MapSection extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (<div id="map" style={{height: 100 + `%`}}></div>);
  }

  componentDidMount() {
    const {filteredOffers} = this.props;
    let lat = 0;
    let long = 0;
    if (!isEmpty(filteredOffers)) {
      lat = filteredOffers[0].city.location.latitude;
      long = filteredOffers[0].city.location.longitude;
    }

    const city = [lat, long];
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    const zoom = 12;
    this.mapLeaf = leaflet.map(`map`, {
      center: city,
      zoom,
      zoomControl: false,
      marker: true
    });
    this.mapLeaf.setView(city, zoom);

    leaflet
    .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    })
    .addTo(this.mapLeaf);
    return filteredOffers.map((item) => {
      return leaflet.marker(item.position, {icon}).addTo(this.mapLeaf);
    });
  }

  componentDidUpdate() {
    const {filteredOffers} = this.props;
    let lat = 0;
    let long = 0;
    if (!isEmpty(filteredOffers)) {
      lat = filteredOffers[0].city.location.latitude;
      long = filteredOffers[0].city.location.longitude;
    }

    const city = [lat, long];
    const zoom = 12;
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 30]
    });

    this.mapLeaf.setView(city, zoom);
    return filteredOffers.map((item) => {
      const {location} = item;
      const position = [location.latitude, location.longitude];
      return leaflet.marker(position, {icon}).addTo(this.mapLeaf);
    });
  }
}

MapSection.propTypes = {
  filteredOffers: PropTypes.array,
};

export default connect(
    (state) => ({
      filteredOffers: state.data.filteredOffers,
    })
)(MapSection);

