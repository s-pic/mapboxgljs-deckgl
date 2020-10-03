import { useEffect } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { withMap } from '../map/withMap';
import { handleFeatureSelect } from '../../utils/handleFeatureSelect';

const UnwrappedGeoJsonPointsLayer = ({
  data,
  map,
  setSelectedFeature,
  unsetSelectedFeature,
}) => {
  useEffect(() => {
    const sourceId = 'random-points-source';
    const layerId = 'random-points-layer';
    map.addSource(sourceId, {
      type: 'geojson',
      data,
    });
    map.addLayer({
      id: layerId,
      // using a circle layer since mapbox does not offer conditionally picking a symbol, see https://github.com/mapbox/mapbox-gl-js/issues/1817
      type: 'circle',
      source: sourceId,
      paint: {
        'circle-radius': [
          'match',
          ['get', 'category'],
          'A',
          10,
          'B',
          5,
          /* default */
          5,
        ],
        'circle-color': [
          'match',
          ['get', 'category'],
          'A',
          '#8b0000',
          'B',
          '#000059',
          /* default */

          '#ccc',
        ],
      },
    });

    handleFeatureSelect({
      map,
      layerId,
      setSelectedFeature,
      unsetSelectedFeature,
    });

    return () => map.removeLayer(layerId);
  }, [data, map, setSelectedFeature, unsetSelectedFeature]);

  return null;
};

UnwrappedGeoJsonPointsLayer.propTypes = {
  data: PropTypes.object.isRequired,
  map: PropTypes.instanceOf(mapboxgl.Map).isRequired,
  setSelectedFeature: PropTypes.func.isRequired,
};

export const GeoJsonPointsLayer = withMap(UnwrappedGeoJsonPointsLayer);
