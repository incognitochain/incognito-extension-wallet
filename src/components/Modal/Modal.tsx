import React from 'react';
import { useSelector } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import last from 'lodash/last';
import { themeSelector } from 'src/module/Setting';
import { COLORS, IGlobalStyle } from 'src/styles';
import styled from 'styled-components';
import { Header } from 'src/components';
import useOutsideRef from 'src/hooks/useDetectClickOutside';
import enhance from './Modal.enhance';
import { modalSelector } from './Modal.selector';
import { IProps } from './Modal.interface';
import { isBrowser } from '../../utils';

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
        background: ${(props: IGlobalStyle) => props.theme.modalBg};
        padding: 30px;
        overflow: hidden;
    }
    .browser-modal-content-wrapper {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 413px;
        background: ${(props: IGlobalStyle) => props.theme.modalBg};
        border-radius: 30px;
        overflow: hidden;
    }
    .close-icon {
        z-index: 2;
        margin-left: auto;
        font-size: 14px;
    }
    .modal-loading-tx {
        position: relative;
        height: 100%;
    }
    .header {
        margin-top: 0;
    }
`;

const Modal = (props: IProps) => {
    const modalState = useSelector(modalSelector);
    const theme = useSelector(themeSelector);
    const { onClose } = props;
    const { data } = modalState;
    const lastModal = last(data);
    const ref: any = React.useRef({});
    const { closeable, data: modalData, customModalStyle, title, isLoadingModal, rightHeader } = lastModal || {};
    useOutsideRef(ref, closeable ? onClose : undefined);
    if (isEmpty(data) || isEmpty(lastModal)) {
        return null;
    }
    const renderModalContent = () => {
        if (isLoadingModal) {
            return (
                <div className={`${isBrowser() ? 'browser-modal-content-wrapper' : 'modal-content-wrapper'} linear-bg`}>
                    <div className="flex modal-loading-tx">{modalData}</div>
                </div>
            );
        }
        return (
            <div
                className={`${isBrowser() ? 'browser-modal-content-wrapper' : 'modal-content-wrapper'}`}
                ref={ref}
                style={customModalStyle}
            >
                {!!title && (
                    <Header
                        onGoBack={() => {
                            if (closeable) {
                                onClose();
                            }
                        }}
                        title={title}
                        rightHeader={rightHeader}
                    />
                )}
                <div className="modal-data">{modalData}</div>
            </div>
        );
    };

    return (
        <Styled className="modal-wrapper" theme={theme}>
            {renderModalContent()}
        </Styled>
    );
};

export default enhance(React.memo(Modal));
