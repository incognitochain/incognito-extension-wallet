import React from 'react';
import { CoinsShieldModal, SelectCoins } from 'src/module/Bridge/components';
import { useDispatch, useSelector } from 'react-redux';
import { actionToggleModal } from 'src/components/Modal';
import { selectedPrivacySelector } from 'src/module/Token';
import { PRV_ID } from 'src/constants/coin';
import { Styled } from './BridgeShield.styled';
import { useShieldShowQRCode } from './BridgeShield.hooks';

const BridgeShield = React.memo(() => {
    const dispatch = useDispatch();
    const tokenSelected = useSelector(selectedPrivacySelector);
    const [showQRCode] = useShieldShowQRCode(tokenSelected);
    const tokenSelectedName = React.useMemo(() => {
        return tokenSelected.tokenId !== PRV_ID ? tokenSelected.name : '';
    }, [tokenSelected]);

    const onOpenSelectCoinsModal = () => {
        dispatch(
            actionToggleModal({
                data: <CoinsShieldModal />,
                closeable: true,
            }),
        );
    };

    return (
        <Styled>
            <SelectCoins
                placeholder="Select a coin to shield"
                text={tokenSelectedName}
                buttonProps={{
                    onClick: onOpenSelectCoinsModal,
                }}
            />
        </Styled>
    );
});

export default BridgeShield;
