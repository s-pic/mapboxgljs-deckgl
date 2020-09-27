import React, { useEffect, useState } from 'react';
import './App.css';
import { mapboxSecret } from './env';
import { Map } from './components/map/Map';
import { GeoJsonPointsLayer } from './components/layer/GeoJsonLayer';
import { ArcLayer } from './components/layer/ArcLayer';

function App() {
  const [sampleGeoData, setSampleGeodata] = useState(null);

  useEffect(() => {
    const url = `${process.env.PUBLIC_URL}/geodata/dummyPois.geojson`;
    fetch(url)
      .then((res) => res.json())
      .then((geoJsonData) => {
        setSampleGeodata(geoJsonData);
      })
      .catch('Failed to load sample geodata');
  }, []);

  return !sampleGeoData ? null : (
    <Map apiToken={mapboxSecret} center={[13.404954, 52.520008]}>
      <GeoJsonPointsLayer data={sampleGeoData} />
      <ArcLayer data={sampleGeoData} />
    </Map>
  );
}

export default App;
