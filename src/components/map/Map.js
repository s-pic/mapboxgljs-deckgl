import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { MapContext } from './MapContext';

const MapWrapper = styled.div`
  height: 100%;
  width: 100%;
  z-index: 1;
`;

export const Map = ({
  apiToken,
  center = [-104.9876, 39.7405],
  zoom = 12.5,
  children,
}) => {
  mapboxgl.accessToken = apiToken; // configure mapbox api
  const mapContainerRef = useRef(null); // attached to the div containing the map
  const [map, setMap] = useState(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/dark-v10',
      center,
      zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    map.on('load', () => {
      map.resize();
      setMap(map);
    });

    // clean up on unmount
    return () => map.remove();
  }, [center, zoom]); // only run effect once

  return (
    <MapWrapper ref={mapContainerRef}>
      <MapContext.Provider value={map}>{children}</MapContext.Provider>
    </MapWrapper>
  );
};

Map.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  apiToken: (props, propName, componentName) => {
    let expectedStart = 'pk.ey';
    const isValidKey = props[propName].startsWith(expectedStart);
    if (!isValidKey) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}.` +
          `Make sure it starts with ${expectedStart}`
      );
    }
  },
  center: PropTypes.arrayOf(PropTypes.number),
  zoom: PropTypes.number,
};
