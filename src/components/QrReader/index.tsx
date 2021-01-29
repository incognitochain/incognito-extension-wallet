import React from 'react';
import styled from 'styled-components';
import { CloseIcon } from 'src/components/Icons';
import { actionToggleModal } from 'src/components/Modal';
import { BrowserQRCodeReader } from '@zxing/library';
import { useDispatch, useSelector } from 'react-redux';
import { isString } from 'lodash';
import Spinner from 'react-bootstrap/esm/Spinner';
import { openAsTab } from 'src/utils';
import { selectedPrivacySelector } from 'src/module/Token';
import { COINS } from 'src/constants';

const Styled = styled.div`
    .icon {
        margin-left: auto;
        margin-bottom: 15px;
    }
    .btn-container {
        margin-top: 30px;
    }
`;

interface IState {
    codeReader: any;
    hasWebcam: boolean;
    hasWebcamPermissions: boolean;
    error: string;
}

interface IProps {
    // eslint-disable-next-line no-unused-vars
    onScan: (value: string) => any;
}

const QrReaderComponent = (props: IProps & any) => {
    const dispatch = useDispatch();
    const [state, setState] = React.useState<IState>({
        codeReader: null,
        hasWebcam: false,
        hasWebcamPermissions: false,
        error: '',
    });
    let { codeReader, hasWebcam, hasWebcamPermissions, error } = state;
    const { onScan }: IProps = props;
    const selectedPrivacy = useSelector(selectedPrivacySelector);
    const checkPermission = async () => {
        try {
            await window.navigator.mediaDevices.getUserMedia({ audio: true, video: true });
            const devices = await window.navigator.mediaDevices.enumerateDevices();
            const webcams = devices.filter((device) => device.kind === 'videoinput');
            const userHasWebcam = webcams.length > 0;
            if (!userHasWebcam) {
                throw new Error('No webcam found');
            }
            const userHasWebcamPermissions = webcams.some((webcam) => webcam.label && webcam.label.length > 0);
            if (!userHasWebcamPermissions) {
                throw new Error('Not webcam permissions');
            }
        } catch (error) {
            openAsTab(`index.html/?page=send&tokenId=${selectedPrivacy.tokenId || COINS.PRV.id}`);
            throw error;
        }
    };
    const initCamera = async () => {
        if (!codeReader) {
            codeReader = new BrowserQRCodeReader();
            return setState({ ...state, codeReader });
        }
        try {
            await codeReader.getVideoInputDevices();
            await checkPermission();
            const content = await codeReader.decodeFromInputVideoDevice(undefined, 'video');
            const result = content.text;
            if (isString(result)) {
                onScan(result);
            }
        } catch (e: any) {
            setState({ ...state, error: e?.message || 'Something went wrong!' });
        }
    };
    const renderWebcamp = () => {
        if (!codeReader) {
            return <Spinner animation="border" />;
        }
        if (!hasWebcam || !hasWebcamPermissions || !!error) {
            return <p>{error}</p>;
        }
        return null;
    };
    React.useEffect(() => {
        initCamera();
    }, [state]);

    return (
        <Styled>
            <CloseIcon onClick={() => dispatch(actionToggleModal({}))} />
            <div className="webcamp-container">
                {renderWebcamp()}
                <video id="video" />
            </div>
        </Styled>
    );
};

export default React.memo(QrReaderComponent);
