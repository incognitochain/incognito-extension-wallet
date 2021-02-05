import React from 'react';
import styled from 'styled-components';
import { CloseIcon, LoadingIcon } from 'src/components/Icons';
import { actionToggleModal } from 'src/components/Modal';
import { BrowserQRCodeReader } from '@zxing/library';
import { useDispatch, useSelector } from 'react-redux';
import { isString } from 'lodash';
import { openAsTab, isContainsQueryString } from 'src/utils';
import { selectedPrivacySelector } from 'src/module/Token';
import { COINS } from 'src/constants';
import { actionSetCameraPermission } from 'src/module/Preload';
import AppReady from 'src/components/AppReady';
import { IGeneralLanguage } from 'src/i18n';
import { themeSelector, translateByFieldSelector } from 'src/module/Configs';
import { IGlobalStyle } from 'src/styles';

const Styled = styled.div`
    background: ${(props: IGlobalStyle) => props.theme.body};
    padding: 20p;
    padding: 20px;
    border-radius: 5%;
    position: relative;
    .close-icon {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 15px;
        right: 20px;
    }
    .btn-container {
        margin-top: 30px;
    }
    #video {
        width: 100%;
        min-height: 192.75px;
        background-color: ${(props: IGlobalStyle) => props.theme.button};
    }
`;

interface IState {
    codeReader: any;
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
        error: '',
    });
    const selectedPrivacy = useSelector(selectedPrivacySelector);
    const theme = useSelector(themeSelector);
    let { codeReader, error } = state;
    const { onScan }: IProps = props;
    const translate: IGeneralLanguage = useSelector(translateByFieldSelector)('general');
    const queryString = `?page=send&tokenId=${selectedPrivacy.tokenId || COINS.PRV.id}`;
    const pathname = `index.html${queryString}`;
    const containsQueryString = isContainsQueryString(queryString);
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
            // has permission
            if (containsQueryString) {
                dispatch(actionSetCameraPermission());
                dispatch(
                    actionToggleModal({
                        data: <AppReady title={translate.cameraReadyDesc} desc={translate.hasCameraDesc} />,
                    }),
                );
            }
        } catch (error) {
            if (!containsQueryString) openAsTab(pathname);
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
    React.useEffect(() => {
        initCamera();
    }, [state]);
    return (
        <Styled theme={theme}>
            <CloseIcon onClick={() => dispatch(actionToggleModal({}))} />
            {!codeReader && <LoadingIcon center />}
            <div className="webcamp-container">
                <p className="center-text fs-large main-text" style={{ marginBottom: '15px' }}>
                    {translate.scanQrCode}
                </p>
                <video id="video" />
                <p className="fs-small center-text sub-text" style={{ marginTop: '10px' }}>
                    {translate.placeQrCode}
                </p>
            </div>
            {error && (
                <p className="fs-small center-text error" style={{ marginTop: '10px' }}>
                    {error}
                </p>
            )}
        </Styled>
    );
};

export default React.memo(QrReaderComponent);
