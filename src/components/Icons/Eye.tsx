import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 20px;
    height: 12.5px;
`;

const Eye = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon" {...props} type="button">
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/eye.png`} alt="add-circle" />
        </Styled>
    );
};

export default Eye;
