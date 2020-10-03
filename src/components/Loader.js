import React from 'react';
import ReactLoader from 'react-loader-spinner';
import styled from 'styled-components';

const FullPageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Loader = () => (
  <FullPageWrapper>
    <ReactLoader
      type="Puff"
      color="#33DFFF"
      height={200}
      width={200}
      timeout={3000}
    />
  </FullPageWrapper>
);
