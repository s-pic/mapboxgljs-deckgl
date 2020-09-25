import React from 'react';
import './App.css';
import { mapboxSecret } from './env';
import { Map } from './components/Map';
console.log('mapboxSecret', mapboxSecret);
function App() {
  return <Map apiToken={mapboxSecret} />;
}

export default App;
