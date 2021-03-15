import { ISelectedPrivacy } from 'src/module/Token';
import React from 'react';
import isEmpty from 'lodash/isEmpty';
import { PRV_ID } from 'src/constants/coin';
import { COINS } from 'src/constants';

export const useShieldShowQRCode = (token: ISelectedPrivacy) => {
    const [showQRCode, setShowQRCode] = React.useState(false);
    const [isPRV, setIsPRV] = React.useState(false);
    React.useEffect(() => {
        if (isEmpty(token)) return;
        const { tokenId, rootNetworkName } = token;
        const isPRV = tokenId === PRV_ID;
        const isETHNetwork = rootNetworkName === COINS.NETWORK_NAME.ETHEREUM;
        setShowQRCode(!isPRV && !isETHNetwork);
        setIsPRV(isPRV);
    }, [token]);
    return [showQRCode, isPRV];
};
