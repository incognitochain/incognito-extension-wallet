import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 9px;
    height: 100%;
    margin-right: 15px;
`;

const ArrowLeft = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled {...props}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/arrow-left.png`} alt="" />
        </Styled>
    );
};

export default ArrowLeft;
