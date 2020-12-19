const MESSAGES_CONSTANTS = {
    VNODE_WITHDRAWAL: 'Withdrawal initiated! Your balance will update in approximately 5 minutes.',
    ALL_NODE_WITHDRAWAL: 'Withdrawal initiated! Your balance will update when the process is complete.',
    PNODE_WITHDRAWAL:
        'Withdrawal initiated! This process may take up to 24 hours. Your balance will update when the process is complete.',
    PNODE_UNSTAKE_LABEL: 'Unstake',
    PNODE_UNSTAKE_DESC: 'Stop funded staking',
    ACCOUNT_NOT_FOUND: 'Missing account',
    UNSTAKING: 'unstaking in process',
    // error
    CAN_NOT_GET_PDEX_TRADE_HISTORIES: 'Can not get pdex trade histories.',
    CAN_NOT_GET_PDEX_DATA: 'Can not get pdex data.',
    CAN_NOT_GET_POOL_DATA: 'Can not get pool data.',
    DISABLE_ETH_BRIDGE: 'Current congestion may affect out-network functionality. Please check back later.',
    CAN_NOT_GET_POOL_HISTORIES: 'Can not get pool histories.',
    INSUFFICIENT_BALANCE: 'Your balance is insufficient.',
    NOT_ENOUGH_NETWORK_FEE: 'Please top up PRV to cover the network fee.',
    CHANGE_WIFI_SUCCESSFULLY_TITLE: 'Success!',
    CHANGE_WIFI_SUCCESSFULLY_DESCRIPTION: 'You changed your Node’s Wi-Fi network.',
    CAN_NOT_CHANGE_WIFI: 'Change wifi unsuccessfully. Please try again.',
    CAN_NOT_GET_HOTSPOT_ID: 'Can not get hotspot id.',
    CAN_NOT_CONNECT_HOTSPOT:
        "Can't connect to your node's hotspot. Please check your wifi list then try again. If you don't see your hotspot, please contact go@incognito.org for support.",
    NODE_OUT_OF_DATE:
        'Your Node is currently undergoing a firmware upgrade, which should take just a few minutes. Simply try again later.',
    NODE_SETUP_LAN_NOT_SUPPORTED:
        'Your node is not supported to update wifi. Please contact go@incognito.org for more information.',
    NODE_NOT_SUPPORTED_UPDATE_WIFI_TITLE: 'Please contact support',
    NODE_NOT_SUPPORTED_UPDATE_WIFI_DESCRIPTION:
        'Your Node is not up to date. Please reach out to go@incognito.org for support.',
    UPDATE_WIFI_INSTRUCTION:
        'Please turn off cellular data on your device. Using Wi-Fi only, make sure your Node is online before proceeding to change networks.',
    PENDING_TRANSACTIONS: 'Please wait for your previous transaction to finish processing. Simply try again later.',
};

export default MESSAGES_CONSTANTS;
