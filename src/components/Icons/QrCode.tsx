import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {
    onClick?: any;
}

const Styled = styled.div`
    width: 20px;
    height: 20px;
    cursor: pointer;
`;

const QrCode = (props: IProps) => {
    const { onClick } = props;
    return (
        <Styled className="icon qrcode-icon" onClick={onClick}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/qrcode.png`} alt="" />
        </Styled>
    );
};

export default QrCode;
