import React from 'react';
import { useSelector } from 'react-redux';
import { validator } from 'src/components/ReduxForm';
import { COINS } from 'src/constants';
import { selectedPrivacySelector } from 'src/module/Token';
import { sendDataSelector, sendSelector } from './Send.selector';

export interface TInner {
    validateAddress: () => any;
    warningAddress: () => string;
}

const enhanceAddressValidation = (WrappedComp: React.FunctionComponent) => (props: any) => {
    const { isExternalAddress, paymentAddress, isIncognitoAddress } = useSelector(sendDataSelector);
    const selectedPrivacy = useSelector(selectedPrivacySelector);
    const { isAddressValidated } = useSelector(sendSelector);
    const { symbol, isErc20Token } = selectedPrivacy;
    const getExternalAddressValidator = React.useCallback(() => {
        if (!isAddressValidated) {
            return validator.combineInvalidAddress;
        }
        if (isErc20Token || symbol === COINS.CRYPTO_SYMBOL.ETH) {
            return validator.combinedETHAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.TOMO) {
            return validator.combinedTOMOAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.BTC) {
            return validator.combinedBTCAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.BNB) {
            return validator.combinedBNBAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.NEO) {
            return validator.combinedNEOAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.ZEN) {
            return validator.combinedZenAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.ZCL) {
            return validator.combinedZCLAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.ZEC) {
            return validator.combinedZECAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.VOT) {
            return validator.combinedVOTAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.VTC) {
            return validator.combinedVTCAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.SNG) {
            return validator.combinedSNGAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.XRB) {
            return validator.combinedXRBAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.XRP) {
            return validator.combinedXRPAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.QTUM) {
            return validator.combinedQTUMAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.PTS) {
            return validator.combinedPTSAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.PPC) {
            return validator.combinedPPCAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.GAS) {
            return validator.combinedGASAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.NMC) {
            return validator.combinedNMCAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.MEC) {
            return validator.combinedMECAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.LTC) {
            return validator.combinedLTCAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.KMD) {
            return validator.combinedKMDAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.HUSH) {
            return validator.combinedHUSHAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.GRLC) {
            return validator.combinedGRLCAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.FRC) {
            return validator.combinedFRCAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.DOGE) {
            return validator.combinedDOGEAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.DGB) {
            return validator.combinedDGBAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.DCR) {
            return validator.combinedDCRAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.CLO) {
            return validator.combinedCLOAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.BTG) {
            return validator.combinedBTGAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.BCH) {
            return validator.combinedBCHAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.BIO) {
            return validator.combinedBIOAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.BVC) {
            return validator.combinedBVCAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.BKX) {
            return validator.combinedBKXAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.AUR) {
            return validator.combinedAURAddress;
        }
        if (symbol === COINS.CRYPTO_SYMBOL.ZIL) {
            return validator.combinedZILAddress;
        }
        // default
        return validator.combinedUnknownAddress;
    }, [paymentAddress, isIncognitoAddress, isExternalAddress, isAddressValidated]);
    const getAddressValidator = () => {
        if (isExternalAddress) {
            return getExternalAddressValidator();
        }
        if (isIncognitoAddress) {
            return validator.combinedIncognitoAddress;
        }
        return [];
    };

    const getWarningAddress = () => {
        if (isExternalAddress) {
            return 'You are exiting Incognito and going public.';
        }
    };

    const validateAddress = getAddressValidator();

    const warningAddress = getWarningAddress();

    return (
        <WrappedComp
            {...{
                ...props,
                validateAddress,
                warningAddress,
            }}
        />
    );
};

export default enhanceAddressValidation;
