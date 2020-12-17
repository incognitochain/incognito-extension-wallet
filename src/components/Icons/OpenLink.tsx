import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
  width: 16px;
  height: 16px;
`;

const OpenLink = (
  props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <Styled className='icon' {...props}>
      <img
        src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/open-link.png`}
        alt=''
      />
    </Styled>
  );
};

export default OpenLink;
