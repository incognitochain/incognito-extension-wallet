import React from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Setting';
import { ITheme, IGlobalStyle } from 'src/styles';
import styled from 'styled-components';

interface IProps {
    toggleValue?: boolean;
    onToggle?: () => void;
}

const Styled = styled.div`
    cursor: pointer;
    position: relative;
    display: inline-block;
    width: 40px;
    height: 21px;
    input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: ${(props: IGlobalStyle) => props.theme.switchButton};
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }
    .slider:before {
        position: absolute;
        content: '';
        height: 17px;
        width: 17px;
        left: 2px;
        bottom: 2px;
        background-color: white;
        -webkit-transition: 0.4s;
        transition: 0.4s;
    }
    input:checked + .slider {
        background-color: ${(props: IGlobalStyle) => props.theme.switchActiveButton};
    }
    input:focus + .slider {
        box-shadow: 0 0 1px ${(props: IGlobalStyle) => props.theme.switchActiveButton};
    }
    input:checked + .slider:before {
        transform: translateX(18px);
    }
    /* Rounded sliders */
    .slider.round {
        border-radius: 10.5px;
    }
    .slider.round:before {
        border-radius: 50%;
    }
`;

const ToggleSwitch = (props: IProps) => {
    const theme: ITheme = useSelector(themeSelector);
    const { toggleValue, onToggle } = props;
    const handleOnClick = () => {
        if (typeof onToggle === 'function') {
            onToggle();
        }
    };
    return (
        <Styled theme={theme} className="switch" onClick={handleOnClick}>
            <input type="checkbox" readOnly checked={!!toggleValue} />
            <span className="slider round" />
        </Styled>
    );
};

export default ToggleSwitch;
