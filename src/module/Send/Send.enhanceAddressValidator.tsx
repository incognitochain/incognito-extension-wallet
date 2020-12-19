// import { walletServices } from 'incognito-js/build/web/browser';
import React from 'react';
import { useSelector } from 'react-redux';
// import { formValueSelector } from 'redux-form';
import { validator } from 'src/components/ReduxForm';
// import { COINS } from 'src/constants';
import {
    isErc20TokenSelector,
    // selectedPrivacySelector,
} from 'src/module/Token';
// import { FORM_CONFIGS } from './Send.enhance';
import {
    sendDataSelector,
    // sendDataSelector,
    // sendSelector,
} from './Send.selector';

export interface TInner {
    validateAddress: () => any;
}

const enhanceAddressValidation = (WrappedComp: React.FunctionComponent) => (props: any) => {
    // const selector = formValueSelector(FORM_CONFIGS.formName);
    const { isIncognitoAddress } = useSelector(sendDataSelector);
    // const selectedPrivacy = useSelector(selectedPrivacySelector);
    const isERC20 = useSelector(isErc20TokenSelector);
    // const {
    // symbol,
    //  pSymbol,
    //   isErc20Token,
    // isNativeToken,
    // } = selectedPrivacy;

    // const isExternalAddress =
    //   !isIncognitoAddress && selectedPrivacy?.isWithdrawable;
    // const isExternalAddress = false;
    // const { isAddressValidated, isValidETHAddress } = useSelector(sendSelector);
    // const getExternalAddressValidator = () => {
    //   if (!isAddressValidated) {
    //     return [validator.invalidAddress(`Invalid ${symbol} address`)];
    //   }
    //   if (!isValidETHAddress) {
    //     return [
    //       validator.invalidAddress(
    //         'Please withdraw to a wallet address, not a smart contract address.'
    //       ),
    //     ];
    //   }
    //   if (isErc20Token || symbol === COINS.CRYPTO_SYMBOL.ETH) {
    //     return validator.combinedETHAddress;
    //   }
    //   if (symbol === COINS.CRYPTO_SYMBOL.TOMO) {
    //     return validator.combinedTOMOAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.BTC) {
    //     return validator.combinedBTCAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.BNB) {
    //     return validator.combinedBNBAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.NEO) {
    //     return validator.combinedNEOAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.ZEN) {
    //     return validator.combinedZenAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.ZCL) {
    //     return validator.combinedZCLAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.ZEC) {
    //     return validator.combinedZECAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.VOT) {
    //     return validator.combinedVOTAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.VTC) {
    //     return validator.combinedVTCAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.SNG) {
    //     return validator.combinedSNGAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.XRB) {
    //     return validator.combinedXRBAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.XRP) {
    //     return validator.combinedXRPAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.QTUM) {
    //     return validator.combinedQTUMAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.PTS) {
    //     return validator.combinedPTSAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.PPC) {
    //     return validator.combinedPPCAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.GAS) {
    //     return validator.combinedGASAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.NMC) {
    //     return validator.combinedNMCAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.MEC) {
    //     return validator.combinedMECAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.LTC) {
    //     return validator.combinedLTCAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.KMD) {
    //     return validator.combinedKMDAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.HUSH) {
    //     return validator.combinedHUSHAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.GRLC) {
    //     return validator.combinedGRLCAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.FRC) {
    //     return validator.combinedFRCAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.DOGE) {
    //     return validator.combinedDOGEAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.DGB) {
    //     return validator.combinedDGBAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.DCR) {
    //     return validator.combinedDCRAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.CLO) {
    //     return validator.combinedCLOAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.BTG) {
    //     return validator.combinedBTGAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.BCH) {
    //     return validator.combinedBCHAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.BIO) {
    //     return validator.combinedBIOAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.BVC) {
    //     return validator.combinedBVCAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.BKX) {
    //     return validator.combinedBKXAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.AUR) {
    //     return validator.combinedAURAddress;
    //   } else if (symbol === COINS.CRYPTO_SYMBOL.ZIL) {
    //     return validator.combinedZILAddress;
    //   }

    //   // default
    //   return validator.combinedUnknownAddress;
    // };

    const getAddressValidator = () => {
        // if (isExternalAddress) {
        //   return getExternalAddressValidator();
        // }
        return validator.combinedIncognitoAddress;
    };

    // const getWarningAddress = () => {
    //   if (isExternalAddress) {
    //     return 'You are exiting Incognito and going public.';
    //   }
    // };

    const validateAddress = getAddressValidator();

    // const warningAddress = getWarningAddress();

    return (
        <WrappedComp
            {...{
                ...props,
                isIncognitoAddress,
                validateAddress,
                isERC20,
                // warningAddress,
                // isExternalAddress,
            }}
        />
    );
};

export default enhanceAddressValidation;
