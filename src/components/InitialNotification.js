import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { GitHub } from 'react-feather';

const Box = styled.div`
  position: fixed;
  top: 12px;
  right: 12px;
  max-width: 600px;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: 36px;
  color: rgba(0, 0, 0, 0.8);
  z-index: 2;

  @media screen and (max-width: 600px) {
    max-width: 100%;
    top: 0;
    right: 0;
  }
`;

const Heading = styled.h3`
  color: rgb(51, 223, 255);
`;

const Text = styled.p`
  color: white;
`;

const SubText = styled(Text)`
  font-style: italic;
`;

const ButtonBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  background-color: rgba(0, 0, 0, 0.8);
  color: rgb(51, 223, 255);
  border-radius: 6px;
  border: none;
  outline: none;
  display: inline-block;
  padding: 10px 25px;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    color: rgba(0, 0, 0, 0.8);
    background-color: rgb(51, 223, 255);
  }
`;

const Link = styled.a`
  color: rgb(250, 190, 40);
  text-decoration: underline;

  &:hover {
    opacity: 0.8;
  }
  &:visited {
    color: rgb(250, 190, 40);
  }
`;

const GithHubLink = styled.a`
  position: absolute;
  top: 36px;
  right: 36px;
`;

const GitHubIcon = styled(GitHub)`
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

export const InitialNotification = ({
  heading,
  text,
  subText,
  subTextLinkRef,
  subTextLinkText,
  githubUrl,
  localStorageFlag = 'app-init-flag',
}) => {
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const userHasPreviouslyConfirmed = localStorage.getItem(localStorageFlag);
    if (userHasPreviouslyConfirmed) {
      setConfirmed(true);
    }
  }, [localStorageFlag]);

  const onConfirm = () => {
    setConfirmed(true);
    localStorage.setItem(localStorageFlag, true);
  };

  return confirmed ? null : (
    <Box>
      <Heading>{heading}</Heading>
      <Text>{text}</Text>
      <SubText>
        {subText}{' '}
        <Link href={subTextLinkRef} target="_blank" rel="noopener noreferrer">
          {subTextLinkText}
        </Link>
      </SubText>
      <ButtonBar>
        <Button onClick={onConfirm}>Got it!</Button>
      </ButtonBar>
      <GithHubLink
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        title="See project on GitHub"
      >
        <GitHubIcon />
      </GithHubLink>
    </Box>
  );
};

InitialNotification.propTypes = {
  heading: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  subText: PropTypes.string.isRequired,
  subTextLinkRef: PropTypes.string.isRequired,
  subTextLinkText: PropTypes.string.isRequired,
  localStorageFlag: PropTypes.string,
  githubUrl: PropTypes.string,
};
