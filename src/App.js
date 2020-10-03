import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './App.css';
import { mapboxSecret } from './env';
import { Map } from './components/map/Map';
import { ArcLayer } from './components/layer/ArcLayer';
import { actionCreators, thunks } from './AppState';
import { ArcLayerSource } from './containers/ArcLayerSource';
import { InitialNotification } from './components/InitialNotification';
import { GeoJsonPointsLayer } from './components/layer/GeoJsonLayer';
import { ArcParamControls } from './components/controls/ArcParamControls';
import { getIsMobile } from './utils/getIsMobile';

const FlexWrapper = styled.div`
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
`;

const MapWrapper = styled.div`
  flex: 1;
`;

function App({
  geoData,
  fetchGeoData,
  setSelectedFeature,
  unsetSelectedFeature,
}) {
  useEffect(() => {
    fetchGeoData(`${process.env.PUBLIC_URL}/geodata/dummyPois.geojson`);
  }, [fetchGeoData]);

  const isMobile = getIsMobile();
  const instructions =
    'Move the mouse over those big red dots to see their linkages to the blue map features. ' +
    'Make sure to checkout the map controls in the bottom. ' +
    `To tilt the map in a 3D view, ${
      isMobile
        ? 'drag two fingers vertically over the map'
        : 'click both mouse buttons and move the mouse around vertically'
    }.`;

  return !geoData ? null : (
    <>
      <InitialNotification
        heading="Hey there, good to see you!"
        text={instructions}
        subText="This is a Proof of Concept of something we work on at"
        subTextLinkText="FixmyBerlin"
        subTextLinkRef="http://fixmyberlin.de/"
        localStorageFlag="mapboxgl-deckgl-init-flag"
        githubUrl="https://github.com/s-pic/mapboxgljs-deckgl"
      />
      <FlexWrapper>
        <MapWrapper>
          <Map apiToken={mapboxSecret} center={[13.404954, 52.520008]}>
            <GeoJsonPointsLayer
              data={geoData}
              setSelectedFeature={setSelectedFeature}
              unsetSelectedFeature={unsetSelectedFeature}
            />
            <ArcLayerSource
              data={geoData}
              render={(arcData, arcParams) => (
                <ArcLayer arcData={arcData} arcParams={arcParams} />
              )}
            />
          </Map>
        </MapWrapper>
        <ArcParamControls />
      </FlexWrapper>
    </>
  );
}

App.propTypes = {
  geoData: PropTypes.object,
  fetchGeoData: PropTypes.func.isRequired,
  setSelectedFeature: PropTypes.func.isRequired,
  unsetSelectedFeature: PropTypes.func.isRequired,
};

const mapStateToProps = ({ geoData }) => ({
  geoData,
});

const mapDispatchToProps = {
  fetchGeoData: thunks.fetchGeoData,
  setSelectedFeature: actionCreators.setSelectedFeature,
  unsetSelectedFeature: actionCreators.unsetSelectedFeature,
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
