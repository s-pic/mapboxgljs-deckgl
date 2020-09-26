import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import styled from 'styled-components';

const MapContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const Map = ({
  apiToken,
  center = [-104.9876, 39.7405],
  zoom = 12.5,
}) => {
  mapboxgl.accessToken = apiToken;
  const mapContainerRef = useRef(null);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      style: 'mapbox://styles/mapbox/streets-v11',
      center,
      zoom,
    });

    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // clean up on unmount
    return () => map.remove();
  }, []);

  return <MapContainer ref={mapContainerRef} />;
};
