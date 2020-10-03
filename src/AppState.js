import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { createSelector } from 'reselect';
import { composeWithDevTools } from 'redux-devtools-extension';

const actionTypes = {
  FETCH_DATA_REQUEST: 'FETCH_DATA_REQUEST',
  FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
  FETCH_DATA_FAILURE: 'FETCH_DATA_FAILURE',
  SET_SELECTED_FEATURE: 'SET_SELECTED_FEATURE',
  UNSET_SELECTED_FEATURE: 'UNSET_SELECTED_FEATURE',
  SET_ARC_PARAMS: 'SET_ARC_PARAMS',
};

export const actionCreators = {
  fetchDataRequest: () => ({
    type: actionTypes.FETCH_DATA_REQUEST,
  }),
  fetchDataSuccess: (data) => ({
    type: actionTypes.FETCH_DATA_SUCCESS,
    payload: data,
  }),
  fetchDataFailure: (error) => ({
    type: actionTypes.FETCH_DATA_FAILURE,
    error,
  }),
  setSelectedFeature: (feature) => ({
    type: actionTypes.SET_SELECTED_FEATURE,
    payload: feature,
  }),
  unsetSelectedFeature: () => ({
    type: actionTypes.UNSET_SELECTED_FEATURE,
  }),
  setArcParams: (arcParams) => ({
    type: actionTypes.SET_ARC_PARAMS,
    payload: arcParams,
  }),
};

export const thunks = {
  fetchGeoData: (url) => (dispatch) => {
    dispatch(actionCreators.fetchDataRequest());

    fetch(url)
      .then((res) => res.json())
      .then((geoJsonData) => {
        const successAction = actionCreators.fetchDataSuccess(geoJsonData);
        dispatch(successAction);
      })
      .catch((error) => {
        const failureAction = actionCreators.fetchDataFailure(
          new Error(`Failed to load sample geodata: ${error.message}`)
        );
        dispatch(failureAction);
      });
  },
};

const initialState = {
  isFetching: false,
  error: null,
  geoData: null,
  selectedFeature: null,
  arcParams: {
    alwaysShowArcs: false,
    arcWidth: 1,
    arcHeight: 1,
    arcTilt: 0,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DATA_REQUEST:
      return { ...state, isFetching: true };
    case actionTypes.FETCH_DATA_FAILURE:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      };
    case actionTypes.FETCH_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        geoData: action.payload,
      };
    case actionTypes.SET_SELECTED_FEATURE:
      return {
        ...state,
        selectedFeature: action.payload,
      };
    case actionTypes.UNSET_SELECTED_FEATURE:
      return {
        ...state,
        selectedFeature: null,
      };
    case actionTypes.SET_ARC_PARAMS:
      return {
        ...state,
        arcParams: action.payload,
      };
    default:
      return state;
  }
};

export const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const selectors = {};
selectors.getSelectedFeature = (state) => state.selectedFeature;
selectors.getArcData = (state) => {
  const arcData = [];
  // Iterate through every feature of category A.
  // Every feature in that category describes its relations to features
  // of category B.
  const features = state.geoData.features;
  features
    .filter((feature) => feature.properties.category === 'A')
    .forEach((currentCategoryAFeature) => {
      // for each related feature, construct an arc from the feature to the related feature.
      // The logic is super simplified because we know our sample data.
      const relatedFeatures = currentCategoryAFeature.properties.relations.map(
        (idOfRelatedFeature) =>
          features.find(
            (feature) => feature.properties.id === idOfRelatedFeature
          )
      );
      relatedFeatures.forEach((relatedFeature) => {
        const newArc = {
          sourceId: currentCategoryAFeature.properties.id,
          source: currentCategoryAFeature.geometry.coordinates,
          target: relatedFeature.geometry.coordinates,
        };
        arcData.push(newArc);
      });
    });
  return arcData;
};
// using reselect to get memoized selectors
selectors.getArcDataForSelectedFeature = createSelector(
  [selectors.getArcData, selectors.getSelectedFeature],
  (arcs, selectedFeature) =>
    !selectedFeature
      ? [] // don't show any arcs at all
      : arcs.filter((arc) =>
          !selectedFeature ? [] : arc.sourceId === selectedFeature.properties.id
        )
);
selectors.getArcParams = (state) => state.arcParams;
