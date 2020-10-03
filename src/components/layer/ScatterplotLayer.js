import { useEffect } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { withMap } from '../map/withMap';
import { MapboxLayer } from '@deck.gl/mapbox';
import { ScatterplotLayer as DeckScatterPlotLayer } from '@deck.gl/layers';

import { handleFeatureSelect } from '../../utils/handleFeatureSelect';

const UnwrappedScatterplotLayer = ({
  data,
  map,
  setSelectedFeature,
  unsetSelectedFeature,
}) => {
  useEffect(() => {
    const sourceId = 'random-points-source';
    const layerId = 'random-points-layer';

    const getIsMainCategoryFeature = (feature) =>
      feature.properties.category === 'A';

    const DARK_RED = [139, 0, 0];
    const DARK_BLUE = [7, 26, 64];
    const BIG_RADIUS = 10;
    const SMALL_RADIUS = 5;
    const layer = new MapboxLayer({
      type: DeckScatterPlotLayer,
      id: sourceId,
      data: data.features,
      radiusUnits: 'pixels',
      opacity: 1,
      stroked: true,
      filled: true,
      pickable: true,
      getPosition: (d) => d.geometry.coordinates,
      getRadius: (d) =>
        getIsMainCategoryFeature(d) ? BIG_RADIUS : SMALL_RADIUS,
      getColor: (d) => (getIsMainCategoryFeature(d) ? DARK_RED : DARK_BLUE),
    });

    map.addLayer(layer);

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

export const ScatterplotLayer = withMap(UnwrappedScatterplotLayer);

ScatterplotLayer.propTypes = {
  data: PropTypes.object.isRequired,
  map: PropTypes.instanceOf(mapboxgl.Map).isRequired,
  setSelectedFeature: PropTypes.func.isRequired,
};
