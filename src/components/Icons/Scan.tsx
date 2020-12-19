import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
  width: 18px;
  height: 18px;
`;

const Scan = (
  props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <Styled
      type='button'
      className={`icon ${props?.className || ''}`}
      {...props}
    >
      <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/scan.png`} alt='' />
    </Styled>
  );
};

export default Scan;
