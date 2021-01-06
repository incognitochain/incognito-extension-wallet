import { ILanguage } from './interface';

const language: ILanguage = {
    preload: {
        title1: `Entering incognito mode<br />for your crypto...`,
        title2: `Please check your connection or<br />re-install the application<br />(only if you have a backup of your private keys) and try again.`,
        btnRetry: 'Retry',
    },
    general: {
        copied: 'Copied',
        copy: 'Copy',
        lostNetwork: 'You are currently offline',
        btnReload: 'Reload',
        loadingTx: `Please do not navigate away till this<br />window closes.`,
        btnRetry: 'Retry',
    },
    home: {
        title: 'Incognito Wallet',
    },
    keychain: {
        headerTitle: 'Keychain',
        yourKeychain: 'Your keychains',
        addKeys: {
            title: 'Add keys',
            addKeychain: 'Add a keychain',
            addKeyChainDesc: 'Create new keychain in a master key',
            importKeyChain: 'Import via private key',
            addMasterKey: 'Add a master key',
            createMasterKey: 'Create new master key',
            importMasterKey: 'Import master key',
        },
    },
    wallet: {
        headerTitle: 'Assets',
        selectAccount: {
            headerTitle: 'Search keychains',
        },
        addCoin: 'Add a coin +',
        error: {
            walletNotExisted: 'Wallet is not exist',
        },
        blockShield: {
            totalShielded: 'Shielded Balance',
            btnShield: 'Shield my crypto',
        },
    },
    token: {
        followToken: {
            headerTitle: 'Add a coin',
            addManually: 'Add manually +',
            dontSeeYourCoin: `Don't see your coin?`,
        },
        addToken: {
            headerTitle: 'Add a coin',
            added: 'Added',
        },
        detail: {
            headerTitle: '',
            btnSend: 'Send',
            btnReceive: 'Receive',
        },
        infoToken: {
            headerTitle: 'Coin info',
        },
        error: {
            tokenIdRequired: 'Token id is required',
        },
    },
    account: {
        create: {
            title: 'Create',
            desc: 'Create a new keychain',
        },
        import: {
            title: 'Import',
            desc: 'Import an existing keychain',
        },
        backup: {
            title: 'Back up',
            desc: 'Backup your private keys',
            headerTitle: 'Backup your private keys',
            copyAll: 'Copy all',
            copied: 'Copied',
        },
        accountDetail: {
            title1: 'Incognito address',
            title2: 'Private key',
            title3: 'Public key',
            title4: 'Readonly key',
            title5: 'Validator key',
            title6: 'Bls key',
            title7: 'Device token',
            index: 'Index',
            shard: 'Shard',
            keychain: 'keychain',
            delete: 'Delete',
        },
        receive: {
            headerTitle: 'Receive anonymously',
            hook: `This is your address.\nUse it to receive any cryptocurrency\nfrom another Incognito address.`,
        },
        error: {
            create: 'Keychain was not created! Please try again.',
            import: 'Import keychain failed, please try again.',
            accountNotExisted: 'Account is not exist',
        },
        success: {
            create: 'Create keychain successful.',
            import: 'Import keychain successful.',
        },
    },
    setting: {
        headerTitle: 'Settings',
        network: {
            title: 'Network',
        },
        dev: {
            title: 'Dev Sections',
            homeConfigs: 'Use staging home configs',
        },
        addressBook: {
            title: 'Address Book',
            desc: 'Manage your saved addresses',
        },
        keychain: {
            title: 'Keychain',
            desc: 'Manage your keychains',
        },
        decimalDigits: {
            title: 'Decimal Digits',
            desc: 'Limit main asset<br />displays to 5 decimal digits',
        },
    },
    send: {
        headerTitle: 'Send',
        amount: 'Enter amount',
        toAddress: 'To',
        incognitoAddress: 'Enter address',
        fee: 'Fee',
        memo: 'Memo',
        placeholderMemo: 'Add a memo (optional)',
        balance: 'Balance',
        confirm: {
            headerTitle: 'Back',
            txId: 'TxID',
            fee: 'Fee',
            time: 'Time',
            toAddress: 'To address',
            amount: 'Amount',
            sent: 'Sent.',
        },
    },
    history: {
        headerTitle: 'History',
        id: 'ID',
        fee: 'Fee',
        status: 'Status',
        time: 'Time',
        toAddress: 'To address',
        coin: 'Coin',
        expiredAt: 'Expired At',
        inchainTxId: 'Inchain TxID',
        outchainTxId: 'Outchain TxID',
        shieldingAddress: 'Shielding address',
        memo: 'Memo',
    },
    addressBook: {
        headerTitle: 'Address book',
        name: 'Name',
        address: 'Address',
        networkName: 'Network',
        btnCreate: 'Create',
        btnEdit: 'Edit',
        btnRemove: 'Remove',
        msgExist: 'Address book is exist!',
        keychains: 'Your keychains',
        incognito: 'Incognito addresses',
        external: 'External addresses',
        headerTitleCreate: 'Create',
        headerTitleEdit: 'Edit',
    },
    shield: {
        headerTitle: 'Search coins',
        placeholder: 'Search coins',
        whyShield: {
            headerTitle: 'Why shield?',
            content: `
            <p class='sub-text'>
                To transact anonymously, first you have to shield your crypto. When
                you send coins to be shielded, an identical – but 100% private –
                version is generated. If you withdraw your coins from the Incognito
                network, this privacy version will be burned, and the original will be
                returned. All original coins are stored safely using the methods
                below:
            </p>
            <p class='fw-bold'>Trustless bridge for Ethereum</p>
            <p class='sub-text'>
                For ETH and all ERC20 tokens, your crypto is safely secured in a
                trustless smart contract.
            </p>
            <p class='fw-bold'>Portal (upcoming)</p>
            <p class='sub-text'>
                For other coins, your crypto is stored in one of the wallets
                maintained by the Incognito Core team. We’re working on a trustless
                solution for this too, called Portal.
            </p>
        `,
        },
        genShieldAddress: {
            headerTitle: 'Shield',
            title1: `Send to this shielding<br />address <span class='fw-bold'>once only.</span>`,
            title2: `Expires in: `,
            title3: `Minimum: `,
            title4: `Smaller amounts will not be processed.`,
            title5: `If sending from an exchange, please take<br />withdrawal times into account.`,
            title6: `It may be more reliable to use a normal<br />wallet as an intermediary.`,
            error1: `We seem to have hit a snag. Simply<br />tap to try again.`,
            error2: `If that doesn’t work,<br /> please come back in 60 minutes.`,
        },
    },
    detail: {
        headerTitle: '',
        btnSend: 'Send',
        btnReceive: 'Receive',
    },
    error: {
        tokenIdRequired: 'Token id is required',
        invalidMnemonic: 'That’s not quite right',
        invalidMasterKeyName: 'Master key names must be alphanumeric. Please choose another.',
        invalidPassword: 'That’s not quite right.',
        invalidPasswordLength: 'Please provide a password of at least 10 characters',
    },
    welcome: {
        newUser: {
            title1: 'Encrypt access to your funds.',
            title2: 'Create a password to protect this wallet. For your eyes only.',
            createPass: 'Create password (min. 10 chars)',
            confirmCreatePass: 'Enter the password again',
            createKey: 'Create new key',
            importKey: 'Import phrase',
            getStartedTitle: 'Private is better.',
            getStartedDesc: 'Time to turn on incognito mode for your crypto.',
            getStartedBtn: 'Get started',
        },
        forgotPass: {
            title1: 'Forgot your password?',
            title2:
                'You’ll need to generate a new wallet using a new password. Then you can either create a new master key to start again from fresh, or import a master key phrase to recover your existing funds.',
            createPass: 'Create password (min. 10 chars)',
            confirmCreatePass: 'Enter the password again',
            createKey: 'Create new key',
            importKey: 'Import phrase',
        },
        oldUser: {
            title: 'Hello again.',
            input: 'Enter your password',
            btn: 'Go Incognito',
            forgotPass: 'Forgot your password?',
        },
    },
    password: {
        enterPasswordInput: 'Enter your password',
        enterPasswordBtn: 'OK',
    },
    masterKey: {
        newMasterKey: {
            createMasterKeyName: 'Enter a name for your master key',
            content: 'The next screen will contain 12 special words that will allow you to recover your funds.',
            content2:
                'Be prepared to record them in a safe place.  If anyone gains access to them, they will gain access to your funds.',
            createKey: "I'm ready",
        },
        verifyMnemonic: {
            title: 'Click on these words in the correct order. If you make a mistake, click again to undo.',
            createBtn: 'Create',
            importBtn: 'Import',
        },
        importMnemonic: {
            title: 'Import master key',
            nameInput: 'Enter a name for your master key',
            mnemonicInput: 'Enter your seed phrase',
            btn: 'Import',
        },
        showMnemonic: {
            title: 'Back up',
            newMnemonic: 'Save these words in the correct order. Never share this phrase with anyone else.',
            newMnemonicBtn: "I've saved my phrase",
            hiddenText: 'Click to reveal.\n Back it up if you haven’t!',
        },
        info: {
            title: 'View keys',
            revealPhrase: 'Reveal master key phrase',
            viewKeys: 'View keychains',
            revealPhraseBtn: 'View keys',
        },
    },
    modal: {
        addKeysModal: 'Add keys',
        createKeyModal: 'Create keychain',
    },
};

export default language;
