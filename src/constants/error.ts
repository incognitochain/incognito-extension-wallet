const WEB_JS_ERROR: any = {
    '-4007': 'Insufficient balance.',
    '-2001': 'Please ensure this private key is valid, and has not already been imported to this device.',
    '-2005': 'Please ensure this private key is valid.',
    '-2': 'Please try again with a valid private key.',
    '-5': 'Insufficient balance.',
    '-3002': 'Something’s not quite right. Please try again later!',
    '-3006': 'Please consolidate UTXOs for this keychain in your Settings tab, then try again.',
};

const CHAIN_ERROR: any = {
    '-6005': 'Please wait for your previous transaction to finish processing. Simply try again later.',
    '-9999': 'The network is a little busy',
};

export const ERROR_CODE: any = {
    ...WEB_JS_ERROR,
    ...CHAIN_ERROR,
    DEFAULT: "It looks like your transaction didn't go through.  Please wait a few minutes and try again",
};
