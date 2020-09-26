import React from 'react';
import './App.css';
import { mapboxSecret } from './env';
import { Map } from './components/Map';
console.log('mapboxSecret', mapboxSecret);
function App() {
  return <Map apiToken={mapboxSecret} center={[13.404954, 52.520008]} />;
}

export default App;
