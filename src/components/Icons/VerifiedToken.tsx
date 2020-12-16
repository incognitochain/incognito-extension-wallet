import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.div`
  width: 14px;
`;

const Setting = (props: IProps) => {
  return (
    <Styled className='verified-icon'>
      <img
        src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/verified-token.png`}
        alt=''
      />
    </Styled>
  );
};

export default Setting;
