import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { IGlobalStyle } from 'src/styles';

interface IProps {
    onHandleChecked: () => any;
    label: string;
    checked: boolean;
}

const Styled = styled.button`
    .icon {
        margin-right: 5px;
        width: 15px;
        height: 15px;
    }
    .checkbox-label {
        line-height: 14px;
        color: ${(props: IGlobalStyle) => props.theme.text};
    }
`;

const CheckboxVector = React.memo((props: any) => {
    return (
        <svg width={15} height={15}>
            <text
                transform="translate(-1 -1)"
                fill="#FFF"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Medium, SF Pro Display"
                fontSize={15}
                fontWeight={400}
                {...props}
            >
                <tspan x={0} y={14}>
                    {'\uDBC0\uDC92'}
                </tspan>
            </text>
        </svg>
    );
});

const CheckedboxVector = React.memo((props: any) => {
    return (
        <svg width={15} height={15}>
            <text
                transform="translate(-31 -385)"
                fill="#FFF"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Medium, SF Pro Display"
                fontSize={15}
                fontWeight={400}
                {...props}
            >
                <tspan x={30} y={398}>
                    {'\uDBC0\uDCF3'}
                </tspan>
            </text>
        </svg>
    );
});

const Checkbox = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { onHandleChecked, label, checked } = props;
    return (
        <Styled className="checkbox-container flex" onClick={onHandleChecked}>
            <div className="icon checkbox-icon">
                {!checked ? <CheckboxVector className="icon-abs" /> : <CheckedboxVector className="icon-abs" />}
            </div>
            {label && <p className="checkbox-label fw-medium">{label}</p>}
        </Styled>
    );
};

Checkbox.propTypes = {
    onHandleChecked: PropTypes.func,
};

export default Checkbox;
