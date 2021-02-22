import React from 'react';
import styled from 'styled-components';
import { ENVS } from 'src/configs';

interface IProps {
    fast2x?: boolean;
    handleClick: () => any;
}

const Lightning = styled.button`
    width: 54px;
    height: 28px;
    border-radius: 8px;
    margin-left: 5px;
`;

const FastFee = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { fast2x, handleClick } = props;
    const renderOneLight = () => {
        return (
            <Lightning
                onClick={() => {
                    fast2x && handleClick();
                }}
                type="button"
                {...props}
            >
                <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/fast-1x${fast2x ? '' : '-selected'}.png`} alt="" />
            </Lightning>
        );
    };
    const renderTwoLight = () => {
        return (
            <Lightning
                onClick={() => {
                    !fast2x && handleClick();
                }}
                type="button"
                {...props}
            >
                <img
                    src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/fast-2x${!fast2x ? '' : '-selected'}.png`}
                    alt=""
                />
            </Lightning>
        );
    };
    return (
        <div className="flex">
            {renderOneLight()}
            {renderTwoLight()}
        </div>
    );
};

export default FastFee;
