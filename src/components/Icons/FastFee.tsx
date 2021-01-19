import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';

interface IProps {
    fast2x?: boolean;
}

const Styled = styled.button`
    width: 30px;
    height: 18px;
`;

const FastFee = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { fast2x } = props;
    return (
        <Styled className="icon" {...props} type="button">
            <img
                src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/${fast2x ? 'fast-2x' : 'fast'}.png`}
                alt="btn-fast-fee"
            />
        </Styled>
    );
};

export default FastFee;
