const mapboxSecret = process.env.REACT_APP_MB_KEY;
if (!mapboxSecret) {
  throw new Error(
    'Mapbox key not defined in .env. Check README.md for instructions'
  );
}

export { mapboxSecret };
