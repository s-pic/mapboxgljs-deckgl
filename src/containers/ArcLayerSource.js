/**
 * Connected Component managing a single arc layer
 */
import { connect } from 'react-redux';
import { selectors } from '../AppState';
import { createStructuredSelector } from 'reselect';

const UnconnectedArcLayerSource = ({
  filteredArcData,
  unfilteredArcData,
  getArcParams,
  render,
}) => {
  const arcDataToRender = getArcParams.alwaysShowArcs
    ? unfilteredArcData
    : filteredArcData;

  return render(arcDataToRender, getArcParams);
};

const mapStateToProps = createStructuredSelector({
  getArcParams: selectors.getArcParams,
  filteredArcData: selectors.getArcDataForSelectedFeature,
  unfilteredArcData: selectors.getArcData,
});

export const ArcLayerSource = connect(mapStateToProps)(
  UnconnectedArcLayerSource
);
