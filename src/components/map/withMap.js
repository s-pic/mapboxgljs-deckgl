import React from 'react';
import { MapContext } from './MapContext';

export const withMap = (MapConsumingComponent) => {
  function WithMap({ ...props }) {
    const map = React.useContext(MapContext);
    return map ? <MapConsumingComponent map={map} {...props} /> : null;
  }

  WithMap.displayName = `withMap(${
    MapConsumingComponent.displayName || MapConsumingComponent.name
  })`;
  return WithMap;
};
