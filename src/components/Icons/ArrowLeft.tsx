import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {}

const Styled = styled(Link)`
  width: 9px;
  height: 100%;
  margin-right: 15px;
`;

const Setting = (props: IProps & LinkProps) => {
  return (
    <Styled {...props}>
      <img
        src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/arrow-left.png`}
        alt=''
      />
    </Styled>
  );
};

export default Setting;
