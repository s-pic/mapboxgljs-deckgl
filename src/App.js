import React from 'react';
import './App.css';
import { mapboxSecret } from './env';
import { Map } from './components/map/Map';
import RemoteGeoJsonLayer from './components/RemoteGeoJsonLayer';

function App() {
  return (
    <Map apiToken={mapboxSecret} center={[13.404954, 52.520008]}>
      <RemoteGeoJsonLayer
        url={`${process.env.PUBLIC_URL}/geodata/dummyPois.geojson`}
      />
    </Map>
  );
}

export default App;
