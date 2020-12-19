import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
  width: 15px;
  height: 100%;
`;

const ArrowUp = (
  props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <Styled {...props}>
      <img
        src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/arrow-up.png`}
        alt=''
      />
    </Styled>
  );
};

export default ArrowUp;
