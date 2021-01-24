import React from 'react';
import styled from 'styled-components';
import { COLORS, ITheme } from 'src/styles';

interface IProps {
    fast2x?: boolean;
    handleClick: () => any;
}

const Lightning = styled.button`
    width: 54px;
    height: 28px;
    border-radius: 8px;
    margin-left: 5px;
    &.selected {
        background-color: ${(props: { theme: ITheme }) => props.theme.button};
        color: ${COLORS.white};
    }
    &.unSelected {
        background-color: ${COLORS.colorGrey};
        color: ${COLORS.colorManateeGrey};
    }
    .p {
        font-size: 14px;
    }
`;

const FastFee = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { fast2x, handleClick } = props;
    const renderOneLight = () => {
        return (
            <Lightning
                onClick={() => {
                    fast2x && handleClick();
                }}
                {...props}
                className={`${fast2x ? 'unSelected' : 'selected'}`}
                type="button"
            >
                <p>􀋦</p>
            </Lightning>
        );
    };
    const renderTwoLight = () => {
        return (
            <Lightning
                onClick={() => {
                    !fast2x && handleClick();
                }}
                {...props}
                className={`${!fast2x ? 'unSelected' : 'selected'}`}
                type="button"
            >
                <p>􀋦􀋦</p>
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
