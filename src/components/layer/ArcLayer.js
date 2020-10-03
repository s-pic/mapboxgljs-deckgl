import { useEffect } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { ArcLayer as DeckArcLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { withMap } from '../map/withMap';

const UnwrappedArcLayer = ({ map, arcData, arcParams }) => {
  // basically we always create a new layer when new input data arrives, which might sound ineffective,
  // but it is fine with Deck.GL, see https://deck.gl/docs/developer-guide/performance

  const { arcWidth, arcHeight, arcTilt } = arcParams;

  useEffect(() => {
    const arcLayerId = 'arcs';

    const arcLayer = new MapboxLayer({
      id: arcLayerId,
      type: DeckArcLayer,
      data: arcData,
      getSourcePosition: (d) => d.source,
      getTargetPosition: (d) => d.target,
      getSourceColor: [51, 223, 255],
      getTargetColor: [51, 223, 255],
      getWidth: arcWidth,
      getHeight: arcHeight,
      getTilt: arcTilt,
    });
    map.addLayer(arcLayer);

    // cleanup-logic
    return () => {
      map.removeLayer(arcLayerId);
    };
  }, [arcData, map, arcWidth, arcHeight, arcTilt]);
  return null;
};

UnwrappedArcLayer.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  map: PropTypes.instanceOf(mapboxgl.Map),
};

export const ArcLayer = withMap(UnwrappedArcLayer);
