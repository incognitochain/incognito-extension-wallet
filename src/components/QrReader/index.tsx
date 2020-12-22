import React from 'react';
import styled from 'styled-components';
import QrReader from 'react-qr-reader';
import { CloseIcon } from 'src/components/Icons';
import { actionToggleModal } from 'src/components/Modal';
import { useDispatch } from 'react-redux';
import { actionToggleToast, Button, TOAST_CONFIGS } from '../Core';

const Styled = styled.div`
    .icon {
        margin-left: auto;
        margin-bottom: 15px;
    }
    .btn-container {
        margin-top: 30px;
    }
`;

const QrReaderComponent = (props: QrReader.props) => {
    const dispatch = useDispatch();
    let ref: any = React.useRef({});
    const handleChooseImage = () => {
        try {
            ref?.current?.openImageDialog();
        } catch (error) {
            dispatch(actionToggleToast({ toggle: true, value: error, type: TOAST_CONFIGS.error }));
        }
    };
    return (
        <Styled>
            <CloseIcon onClick={() => dispatch(actionToggleModal({}))} />
            <QrReader ref={ref} {...props} />
            <Button title="Choose Image" onClick={handleChooseImage} />
        </Styled>
    );
};

export default React.memo(QrReaderComponent);
