import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { IGlobalStyle } from 'src/styles';
import { CloseIcon } from 'src/components/Icons';
import { toastSelector } from './Toast.selector';
import { TOAST_CONFIGS_CLASSNAME } from './Toast.reducer';
import { actionToggleToast } from './Toast.actions';

const Styled = styled.div`
    position: absolute;
    right: 15px;
    left: 15px;
    top: 15px;
    visibility: hidden;
    padding: 15px;
    z-index: 10001;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 10px;
    &.show {
        visibility: visible;
        animation: fadeInDown 0.5s, fadeOutUp 0.5s 4s;
        background-color: ${(props: IGlobalStyle) => props.theme.toastBg};
    }
    .close-icon {
        position: absolute;
        top: 7px;
        right: 7px;
        cursor: pointer;
        width: 12px;
        height: 12px;
    }
    .scroll-view {
        max-height: 50px;
        padding-bottom: unset;
    }
`;

const Toast = () => {
    const dispatch = useDispatch();
    const { value, type, toggle } = useSelector(toastSelector);
    const className = `${TOAST_CONFIGS_CLASSNAME[String(type)]}`;
    const handleCloseToast = () => dispatch(actionToggleToast({ toggle: false }));
    React.useEffect(() => {
        if (toggle) {
            let timeoutId = setTimeout(() => {
                handleCloseToast();
            }, 3900);
            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [toggle]);
    return (
        <Styled className={`${toggle ? 'show' : ''}`}>
            <div className="scroll-view">
                <p className={`${className} fs-small`}>{value}</p>
            </div>
            <CloseIcon onClick={handleCloseToast} />
        </Styled>
    );
};

export default Toast;
