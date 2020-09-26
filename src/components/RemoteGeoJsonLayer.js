import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withMap } from './map/withMap';

const RemoteGeoJsonPointsLayer = ({ url, map }) => {
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((geoJsonData) => {
        const sourceId = 'random-points-source';
        const layerId = 'random-points-layer';
        map.addSource(sourceId, {
          type: 'geojson',
          data: geoJsonData,
        });
        map.addLayer({
          id: layerId,
          type: 'symbol',
          source: sourceId,
          layout: {
            'icon-image': 'bicycle-15', // see https://labs.mapbox.com/maki-icons for list of icons
            'icon-allow-overlap': true,
            'icon-anchor': 'bottom',
          },
          paint: {
            'icon-color': ['feature-state', 'marker-color'], // wtf, mapbox is not able to colorize icons, see https://github.com/mapbox/mapbox-gl-js/issues/1817
          },
        });
      })
      .catch('Failed to load geojson layer');
  }, [map, url]);

  return null;
};

RemoteGeoJsonPointsLayer.propTypes = {
  url: PropTypes.string,
};

export default withMap(RemoteGeoJsonPointsLayer);
