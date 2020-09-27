import { useEffect } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { withMap } from '../map/withMap';

const UnwrappedGeoJsonPointsLayer = ({ data, map }) => {
  useEffect(() => {
    const sourceId = 'random-points-source';
    const layerId = 'random-points-layer';
    map.addSource(sourceId, {
      type: 'geojson',
      data,
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
  });

  return null;
};

UnwrappedGeoJsonPointsLayer.propTypes = {
  data: PropTypes.object,
  map: PropTypes.instanceOf(mapboxgl.Map),
};

export const GeoJsonPointsLayer = withMap(UnwrappedGeoJsonPointsLayer);
