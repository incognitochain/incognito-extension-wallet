import React, { SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {
  route?: string;
  onClick?: any;
}

const Styled = styled(Link)`
  width: 24px;
  height: 24px;
`;

const QrCode = (props: IProps) => {
  const { route = '#', onClick } = props;
  const handleClick = (e: SyntheticEvent) => {
    if (typeof onClick === 'function') {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <Styled to={route} onClick={handleClick}>
      <img
        src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/qrcode.png`}
        alt=''
      />
    </Styled>
  );
};

export default QrCode;
