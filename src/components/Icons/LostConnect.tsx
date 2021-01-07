import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 60px;
    height: 60px;
`;

const LostConnect = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon" {...props}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/lost-connect.png`} alt="" />
        </Styled>
    );
};

export default LostConnect;
