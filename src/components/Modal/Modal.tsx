import React from 'react';
import { useSelector } from 'react-redux';
import { last, isEmpty } from 'lodash';
import { themeSelector } from 'src/module/Configs';
import { COLORS, IGlobalStyle } from 'src/styles';
import styled from 'styled-components';
import { Header } from 'src/components';
import enhance from './Modal.enhance';
import { modalSelector } from './Modal.selector';
import { IProps } from './Modal.interface';

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
`;

const Modal = (props: IProps) => {
    const modalState = useSelector(modalSelector);
    const theme = useSelector(themeSelector);

    const { onClose } = props;

    const { data } = modalState;
    const lastModal = last(data);

    if (isEmpty(data) || isEmpty(lastModal)) {
        return null;
    }

    const { closeable, data: modalData, customModalStyle, title, isLoadingModal } = lastModal;

    const renderModalContent = () => {
        if (isLoadingModal) {
            return (
                <div className="modal-content-wrapper linear-bg">
                    <div className="flex modal-loading-tx">{data}</div>
                </div>
            );
        }
        return (
            <div className="modal-content-wrapper" style={customModalStyle}>
                {!!title && <Header onGoBack={closeable ? onClose : undefined} title={title} />}
                {modalData}
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
