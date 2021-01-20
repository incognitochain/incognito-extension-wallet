import React, { useRef } from 'react';
import styled from 'styled-components';
import { ENVS } from 'src/configs';
import { useDispatch } from 'react-redux';
import { actionRemoveTooltip, actionShowTooltip } from 'src/module/Tooltip';
import { getURL } from 'src/utils/app';
import enhance from './ConnectStatus.enhance';

const Styled = styled.button`
    .wrapper {
        cursor: pointer;
    }
    .icon {
        width: 21px;
        height: 21px;
    }
`;

interface IProps {
    onPressConnect: () => void;
}

const idConnect = 'tooltip-connect';
const ConnectStatus = (props: IProps & any) => {
    const { onPressConnect, originUrl } = props;
    let host: any = null;
    if (originUrl) host = getURL(originUrl);
    const dispatch = useDispatch();
    const iconConnectRef: any = useRef(null);
    const showToolTip = () => {
        if (!host) return;
        dispatch(
            actionShowTooltip({
                id: idConnect,
                text: host?.hostname,
                ref: iconConnectRef ? iconConnectRef.current : null,
            }),
        );
    };
    const removeTooltip = () => dispatch(actionRemoveTooltip(idConnect));
    const onClickConnect = () => {
        onPressConnect && onPressConnect();
        removeTooltip();
    };
    return (
        <Styled onClick={onClickConnect} ref={iconConnectRef} onMouseOver={showToolTip} onMouseOut={removeTooltip}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/connect.png`} alt="" className="icon" />
        </Styled>
    );
};

export default enhance(ConnectStatus);
