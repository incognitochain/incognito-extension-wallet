export interface ILanguage {
    [key: string]: any;
    general: IGeneralLanguage;
    home: {
        title: string;
    };
    keychain: IKeychainLanguage;
    wallet: {
        headerTitle: string;
        selectAccount: {
            headerTitle: string;
        };
        addCoin: string;
        error: {
            walletNotExisted: string;
        };
        blockShield: {
            totalShielded: string;
            btnShield: string;
        };
    };
    token: ITokenLanguage;
    account: IAccountLanguage;
    setting: ISettingLanguage;
    history: IHistoryLanguage;
    send: ISendLanguage;
    addressBook: IAddressBookLanguage;
}

export interface IAddressBookLanguage {
    headerTitle: string;
    name: string;
    address: string;
    networkName: string;
    btnCreate: string;
    btnEdit: string;
    btnRemove: string;
    msgExist: string;
    keychains: string;
    incognito: string;
    external: string;
    headerTitleCreate: string;
    headerTitleEdit: string;
}

export interface IConfirmTxLanguage {
    headerTitle: string;
    txId: string;
    fee: string;
    time: string;
    toAddress: string;
    amount: string;
    sent: string;
}

export interface ISendLanguage {
    headerTitle: string;
    amount: string;
    toAddress: string;
    incognitoAddress: string;
    fee: string;
    memo: string;
    placeholderMemo: string;
    confirm: IConfirmTxLanguage;
    balance: string;
}

export interface IHistoryLanguage {
    headerTitle: string;
    id: string;
    fee: string;
    status: string;
    time: string;
    toAddress: string;
    coin: string;
}

export interface ISettingLanguage {
    headerTitle: string;
    network: {
        title: string;
    };
    dev: {
        title: string;
        homeConfigs: string;
    };
    addressBook: {
        title: string;
        desc: string;
    };
    keychain: {
        title: string;
        desc: string;
    };
    decimalDigits: {
        title: string;
        desc: string;
    };
}

export interface IAccountLanguage {
    create: {
        title: string;
        desc: string;
    };
    import: {
        title: string;
        desc: string;
    };
    backup: {
        headerTitle: string;
        title: string;
        desc: string;
        copyAll: string;
        copied: string;
    };
    accountDetail: {
        title1: string;
        title2: string;
        title3: string;
        title4: string;
        title5: string;
        title6: string;
        title7: string;
        title8: string;
        keychain: string;
        delete: string;
    };
    receive: {
        headerTitle: string;
        hook: string;
    };
    error: {
        create: string;
        import: string;
        accountNotExisted: string;
    };
    success: {
        create: string;
        import: string;
    };
}

export interface IKeychainLanguage {
    headerTitle: string;
    yourKeychain: string;
}

export interface ITokenLanguage {
    followToken: {
        headerTitle: string;
        addManually: string;
        dontSeeYourCoin: string;
    };
    addToken: {
        headerTitle: string;
        added: string;
    };
    detail: {
        headerTitle: string;
        btnSend: string;
        btnReceive: string;
    };
    infoToken: {
        headerTitle: string;
    };
    error: {
        tokenIdRequired: string;
    };
}

export interface IGeneralLanguage {
    copied: string;
    copy: string;
    lostNetwork: string;
    btnReload: string;
}
