import { useEffect } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import { ArcLayer as DeckArcLayer } from '@deck.gl/layers';
import { MapboxLayer } from '@deck.gl/mapbox';
import { withMap } from '../map/withMap';

const UnwrappedArcLayer = ({ map, data }) => {
  useEffect(() => {
    const arcData = [];
    // Iterate through every feature of category A.
    // Every feature in that category describes its relations to features
    // of category B.
    const features = data.features;
    features
      .filter((feature) => feature.properties.category === 'A')
      .forEach((currentCategoryAFeature) => {
        // for each related feature, construct an arc from the feature to the related feature.
        // The logic is super simplified because we know our sample data.
        const relatedFeatures = currentCategoryAFeature.properties.relations.map(
          (idOfRelatedFeature) =>
            features.find(
              (feature) => feature.properties.id === idOfRelatedFeature
            )
        );
        relatedFeatures.forEach((relatedFeature) => {
          const newArc = {
            source: currentCategoryAFeature.geometry.coordinates, // TODO: use functions instead of direct property access
            target: relatedFeature.geometry.coordinates,
          };
          arcData.push(newArc);
        });
      });

    const arcLayer = new MapboxLayer({
      id: 'arcs',
      type: DeckArcLayer,
      data: arcData,
      getSourcePosition: (d) => d.source,
      getTargetPosition: (d) => d.target,
      getSourceColor: () => [51, 223, 255],
      getTargetColor: () => [51, 223, 255],
    });
    map.addLayer(arcLayer);
  }, [data, map]);
  return null;
};

UnwrappedArcLayer.propTypes = {
  data: PropTypes.object,
  map: PropTypes.instanceOf(mapboxgl.Map),
};

export const ArcLayer = withMap(UnwrappedArcLayer);
