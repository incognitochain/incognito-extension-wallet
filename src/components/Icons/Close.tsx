import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 20px;
    height: 20px;
`;

const Close = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon close-icon" {...props}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/close.png`} alt="" />
        </Styled>
    );
};

export default Close;
