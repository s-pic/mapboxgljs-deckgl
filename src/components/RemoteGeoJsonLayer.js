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
            // TODO: style dynamically based on feature props
            'icon-image': 'marker-15', // see https://labs.mapbox.com/maki-icons for list of icons
            'icon-allow-overlap': true,
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
