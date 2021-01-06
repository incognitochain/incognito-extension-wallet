import React from 'react';
import { useHistory } from 'react-router-dom';
import { COLORS, FONT_SIZES } from 'src/styles';
import styled from 'styled-components';
import { route as routeDisconnect } from 'src/module/Disconnect/Disconnect.route';

const Styled = styled.button`
    .wrapper {
        padding: 3px 5px;
        display: flex;
        flex-direction: row;
        align-items: center;
        cursor: pointer;
        position: absolute;
        left: -5px;
        top: 0px;
        background-color: ${COLORS.lightGrey12};
        border-radius: 5px;
    }
    .status-label {
        font-size: ${FONT_SIZES.superSmall + 1}px;
        color: ${COLORS.green};
        line-height: ${FONT_SIZES.regular}px;
    }
    .circle {
        width: 7px;
        height: 7px;
        border-radius: 3.5px;
        margin-right: 3px;
        background-color: ${COLORS.green};
    }
`;

const ConnectStatus = () => {
    const history = useHistory();
    const moveToDisconnectScreen = () => history.push(routeDisconnect);
    return (
        <Styled onClick={moveToDisconnectScreen}>
            <div className="wrapper">
                <div className="circle" />
                <p className="status-label fw-regular">Connected</p>
            </div>
        </Styled>
    );
};

export default ConnectStatus;
