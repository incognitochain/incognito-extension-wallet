import CODE from './code';

const message = {
    [CODE.timeout_promise]: 'Timeout excuting funtion',
    [CODE.estimate_fee_with_zero_balance]: 'Can not calculate fee on zero balance, please check your amount.',
    [CODE.firebase_init_failed]: 'Firebase service can not run on your app, please contact us for supporting.',
    [CODE.network_make_request_failed]:
        "Something went wrong. Please make sure you're connected to the internet and try again.",
    [CODE.player_have_pending_transactions]: 'Player has pending transactions.',
    [CODE.api_device_id_existed]: 'This device has been registed.',
    [CODE.web_js_token_balance_is_zero]: 'Your balance is not enough.',
    [CODE.withdraw_balance_must_not_be_zero]: 'Your balance is zero, please deposit more.',
    [CODE.withdraw_gen_withdraw_address_failed]: 'Can not get withdraw address, please try again.',
    [CODE.getStarted_can_not_create_wallet_on_existed]: 'Can not create new wallet on existing wallet.',
    [CODE.wallet_can_not_create_new_wallet]:
        'Sorry, we can not create new wallet, close and reopen the app can fix it.',
    [CODE.wallet_can_not_load_existed_wallet]: 'Something’s not right. Please re-install this app and try again.',
    [CODE.createAccount_failed]: 'Account was not created! Please try again.',
    [CODE.createAccount_existed_name]: 'You already have an account with this name. Please try another.',
    [CODE.home_load_following_token_failed]: 'Is your list coin not show? Pull to reload your the list.',
    [CODE.home_load_balance_failed]: 'Refresh to reload your balance.',
    [CODE.importAccount_failed]: 'Account was not imported, please try again.',
    [CODE.importAccount_existed]: 'This account already exists on your device. Please try another.',
    [CODE.web_js_import_existed_account]:
        'Please make sure this private key is valid and does not already exist on your device.',
    [CODE.web_js_import_invalid_key_2]: 'Please try again with a valid private key.',
    [CODE.node_duplicate]: 'This node already exists on your device. Please try another.',
    [CODE.node_invalid_host]: 'This address is not a valid domain or ip address. Please try another.',
    [CODE.getStarted_load_token_failed]:
        "Something's gone wrong. Please check your connection and try again, or contact go@incognito.org.",
    [CODE.user_login_failed]: 'We have an authorization issue.',
    [CODE.paaps_invalid_daap_url]: 'Please enter a valid pApp URL',
    [CODE.web_js_import_invalid_key]: 'Please make sure this private key is valid.',
    [CODE.web_js_can_not_use_this_token_for_fee]: 'Can not use this coin for fee, please try another.',
    [CODE.estimate_fee_does_not_support_type_of_fee]: 'Can not use this coin for fee, please try another.',
    [CODE.web_js_not_enough_coin]: 'Your balance is not enough for this transaction.',
    [CODE.addBep2Token_not_found]: "This BEP2 coin doesn't seem to exist. Please check and try again.",
    [CODE.api_add_private_token_already_existed]: 'This coin has been added.',
    [CODE.addErc20Token_not_found]: 'This BEP2 coin has been added.',
    [CODE.api_qrcode_fail_ProductNotFound]: 'This QR code is unfamiliar. Please try again.',
    [CODE.api_qrcode_fail_QRCodeAlreadyStaked]: "You've already set up this Node.",
    [CODE.node_auth_firebase_fail]: 'Something went wrong. Please try to set up your Node again.',
    [CODE.node_verify_code_fail]:
        'Something’s not right. Please send an email to go@incognito.org so we can assist you directly.',
    [CODE.node_create_account_fail]: 'Something went wrong. Please close the app and try again.',
    [CODE.node_can_not_connect_hotspot]:
        'Something went wrong. Please open Wi-Fi settings on your device and connect to Node again.',
    [CODE.node_can_not_get_wifi_name]: 'Can not get wifi name',
    [CODE.papp_can_not_opened]: 'Sorry, we can not open this pApp. Please try again or check the pApp URL.',
    [CODE.papp_the_token_is_not_supported]: 'This token is not supported in the pApp.',
    [CODE.api_invalid_size_upload_file]: "Upload file's size is invalid, file size must be less than 50kB",
    [CODE.document_picker_oversize]: 'File size is too large, please use a smaller one.',
    [CODE.document_picker_must_be_png]: 'Please use a PNG image.',
    [CODE.api_invalid_type_upload_file]: 'Your upload file type is incorrect.',
    [CODE.NOT_ENOUGH_NETWORK_FEE_ADD]: 'Please top up PRV to cover the network fee.',
    [CODE.node_pending_withdrawal]:
        'Please wait for your previous withdrawal request to finish processing. Simply try again later.',
    [CODE.api_bnb_memo_required]: 'The Memo is required',
    [CODE.FULLNODE_DOWN]: 'The network is a little busy',
    [CODE.api_unstake_fail]: 'Your previous withdrawal is still processing. Please wait then try again.',
    [CODE.web_js_can_not_created_tx]: 'Something’s not quite right. Please try again later!',
    [CODE.api_trade_maintain]: 'The exchange is down for maintenance. Please wait then try again later.',
    [CODE.api_insufficient_funds]: 'Incognito is currently experiencing high volume. Please try again later.',
    [CODE.web_js_can_not_send_main_crypto]: 'Streamline this keychain now for efficient transactions',
    [CODE.api_tx_hash_invalid]:
        'This is taking a little longer than usual, but will be automatically retried soon. Simply check back later.',
};

export default message;
