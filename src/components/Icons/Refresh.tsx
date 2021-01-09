import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 19px;
    height: 20px;
`;

const Refresh = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon" {...props}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/refresh.png`} alt="" />
        </Styled>
    );
};

export default Refresh;
