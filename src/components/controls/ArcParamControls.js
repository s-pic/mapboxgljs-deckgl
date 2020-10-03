import React from 'react';
import { CheckBox, RangeInput } from 'grommet';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { actionCreators } from '../../AppState';

const Wrapper = styled.div`
  padding: 24px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  @media screen and (max-width: 600px) {
    padding: 12px;
  }

  @media screen and (max-width: 1024px) {
    justify-content: space-between;
  }
`;

const ItemWrapper = styled.div`
  max-width: 150px;
  padding: 0 36px;

  @media screen and (max-width: 1024px) {
    max-width: 100px;
    padding: 0 12px;
  }
`;

const UnconnectedArcParamControls = ({
  alwaysShowArcs,
  arcWidth,
  arcHeight,
  arcTilt,
  setArcParams,
}) => {
  const createGenericChangeHandler = (itemType) => (event) => {
    const updatedArcParams = {
      alwaysShowArcs,
      arcWidth,
      arcHeight,
      arcTilt,
      ...{
        [event.target.name]:
          itemType === 'checkbox' ? event.target.checked : +event.target.value,
      },
    };
    setArcParams(updatedArcParams);
  };
  return (
    <Wrapper>
      <CheckBox
        checked={alwaysShowArcs}
        name="alwaysShowArcs"
        label="Always show Linkages?"
        onChange={createGenericChangeHandler('checkbox')}
      />
      <ItemWrapper>
        Arc Width
        <RangeInput
          value={arcWidth}
          name="arcWidth"
          onChange={createGenericChangeHandler('rangeinput')}
          min={0}
          max={1}
          step={0.1}
        />
      </ItemWrapper>
      <ItemWrapper>
        Arc Height
        <RangeInput
          value={arcHeight}
          name="arcHeight"
          onChange={createGenericChangeHandler('rangeinput')}
          min={0}
          max={1}
          step={0.1}
        />
      </ItemWrapper>
      <ItemWrapper>
        Arc Tilt
        <RangeInput
          value={arcTilt}
          name="arcTilt"
          onChange={createGenericChangeHandler('rangeinput')}
          min={-90}
          max={90}
          step={1}
        />
      </ItemWrapper>
    </Wrapper>
  );
};

UnconnectedArcParamControls.propTypes = {
  alwaysShowArcs: PropTypes.bool.isRequired,
  arcWidth: PropTypes.number.isRequired,
  arcHeight: PropTypes.number.isRequired,
  arcTilt: PropTypes.number.isRequired,
  setArcParams: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state.arcParams,
});
const mapDispatchToProps = {
  setArcParams: actionCreators.setArcParams,
};
export const ArcParamControls = connect(
  mapStateToProps,
  mapDispatchToProps
)(UnconnectedArcParamControls);
