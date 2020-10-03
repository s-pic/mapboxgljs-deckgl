let cachedSelectedFeature;

export const handleFeatureSelect = ({
  map,
  layerId,
  setSelectedFeature,
  unsetSelectedFeature,
}) => {
  map.on('mousemove', layerId, (event) => {
    if (!event.features) return; // no action if no feature is hovered
    // no action if the selected feature is hovered again
    const hoveredFeature = event.features[0];
    // locally cache selectedFeature to not let another mouse move over the already selectedFeature trigger a select event.
    // Somehow, when the mouse is moved over a feature, the cached feature does not technically equal the hovered feature.
    // therefore we need to compare IDs.
    const idOfHoveredFeature = hoveredFeature.properties.id;
    const cachedFeature = cachedSelectedFeature;
    const idOfCachedFeature = cachedFeature && cachedFeature.properties.id;
    const itsStillTheSameFeatureBeingHovered =
      idOfHoveredFeature === idOfCachedFeature;
    if (itsStillTheSameFeatureBeingHovered) {
      return; // no action
    }
    // else notify that a new feature is hovered ..
    setSelectedFeature(hoveredFeature);
    // and cache that feature
    cachedSelectedFeature = hoveredFeature;
  });
  map.on('mouseleave', layerId, () => {
    unsetSelectedFeature();
    cachedSelectedFeature = null;
  });
};
