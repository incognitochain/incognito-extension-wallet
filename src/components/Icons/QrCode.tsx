import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {
    onClick?: any;
}

const Styled = styled.span`
    width: 18px;
    height: 18px;
    cursor: pointer;

    img {
        width: 18px;
        height: 18px;
    }
`;

const QrCode = (props: IProps) => {
    const { onClick } = props;
    return (
        <Styled onClick={onClick}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/qrcode.png`} alt="" />
        </Styled>
    );
};

export default QrCode;
