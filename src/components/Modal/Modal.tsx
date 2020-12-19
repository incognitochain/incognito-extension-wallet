import React from 'react';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Configs';
import { COLORS, IGlobalStyle } from 'src/styles';
import styled from 'styled-components';
import { modalSelector } from './Modal.selector';

const Styled = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    display: flex;
    justify-content: center;
    background-color: ${COLORS.overlayBlackLight};
    .modal-content-wrapper {
        position: absolute;
        min-width: ${(props: IGlobalStyle) => props.theme.minWidth};
        max-width: ${(props: IGlobalStyle) => props.theme.maxWidth};
        width: ${(props: IGlobalStyle) => props.theme.width};
        height: ${(props: IGlobalStyle) => props.theme.height};
        background: ${(props: IGlobalStyle) => props.theme.body};
        padding: 30px;
    }
`;

const Modal = () => {
    const modalState = useSelector(modalSelector);
    const theme = useSelector(themeSelector);
    const { data, visible } = modalState;
    if (!visible) {
        return null;
    }
    return (
        <Styled className="modal-wrapper" theme={theme}>
            <div className="modal-content-wrapper">{data}</div>
        </Styled>
    );
};

export default React.memo(Modal);
