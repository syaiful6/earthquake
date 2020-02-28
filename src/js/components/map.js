import React, { Component } from 'react';
import * as L from 'leaflet';

import {getBboxZoom} from '../utils';

function createClusterIcon(feature, latlng) {
    if (!feature.properties.cluster) return L.marker(latlng);

    const count = feature.properties.point_count;
    const size =
        count < 100 ? 'small' :
        count < 1000 ? 'medium' : 'large';
    const icon = L.divIcon({
        html: `<div><span>${  feature.properties.point_count_abbreviated  }</span></div>`,
        className: `marker-cluster marker-cluster-${  size}`,
        iconSize: L.point(40, 40)
    });

    return L.marker(latlng, {icon});
}

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && !feature.properties.cluster) {
        layer.bindPopup(`<h3>${feature.properties.title}</h3>
          <p class="date">${(new Date(feature.properties.time)).toDateString()}
          at depth of ${feature.geometry.coordinates[2]} km</h4>
           <div class="detail">
           <span>Tsunami: ${feature.properties.tsunami ? 'Yes' : 'No'}</span>
           <span>Status: ${feature.properties.status ? feature.properties.status.toUpperCase() : 'unknown'}</span>
           </div>
          <a class="link" href=${feature.properties.url} target="_blank">More Info</a>`
         );
    }
}

export default class EarthquakesMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      markers: null,
    }
  }

  updateMap() {
    const {onMoveEnd} = this.props;
    const params = getBboxZoom(this.state.map);
    onMoveEnd(params.bbox, params.zoom)
  }

  getExpansion(e) {
    const {onExpansion} = this.props;
    if (e.layer.feature.properties.cluster_id) {
      onExpansion(e.layer.feature.properties.cluster_id, e.latlng)
    }
  }

  componentDidMount() {
    const {onInit} = this.props;
    if (this.state.map === null && this.refs.map) {
      this.state.map = L.map(this.refs.map).setView([0, 0], 2);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.state.map);
      this.state.markers =  L.geoJson(null, {
          pointToLayer: createClusterIcon,
          onEachFeature: onEachFeature,
      }).addTo(this.state.map);

      onInit(this.state.map, this.state.markers);
      this.state.map.on('moveend', this.updateMap.bind(this));
      this.state.markers.on('click', this.getExpansion.bind(this));
    }
  }

  render() {
    return (
      <div ref="map"></div>
    )
  }
}
