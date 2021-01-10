import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 16px;
    height: 16px;
`;

const Info = React.forwardRef((props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>, ref: any) => {
    return (
        <Styled className="icon" ref={ref} {...props}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/info.png`} alt="" />
        </Styled>
    );
});

export default Info;
