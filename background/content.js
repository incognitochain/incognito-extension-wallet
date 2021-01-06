import { 
    INCOGNITO_EXTENSION_SEND_DATA,
    BACKGROUND_LISTEN,
} from './consts';
import { extension } from './extension'

const formatData = (data) => {
    data = {
        ...data,
        actionKey: `INCOGNITO_EXTENSION|${data.origin}`,
        actionName: data.key
    };
    delete data['name'];
    delete data['origin'];
    return data;
}
const handlePostMessageToDApp = (data) => {
    if (!data) return;
    try {
        window.postMessage(formatData(data));
    } catch (error) {
        console.debug('CONTENT SCRIPT POST MESSAGE ERROR: ', error);
    }
};

// Request Connect account within extension
const requestConnectAccount = async () => (
    new Promise((resolve) => {
        extension.runtime.sendMessage({ name: BACKGROUND_LISTEN.REQUEST_CONNECT_ACCOUNT }, (response) => {
            resolve(response)
        });
    })
);

// Request Connect account within extension
const requestSendTx = async (data) => (
    new Promise((resolve) => {
        extension.runtime.sendMessage(Object.assign({ name: BACKGROUND_LISTEN.REQUEST_SEND_TX }, data), (response) => {
            resolve(response)
        });
    })
);

// Client request Connect account
window.addEventListener(BACKGROUND_LISTEN.REQUEST_CONNECT_ACCOUNT, async () => {
    await requestConnectAccount();
}, false)

// Client request Connect account
window.addEventListener(BACKGROUND_LISTEN.REQUEST_SEND_TX, async (event) => {
    if (!event.detail) return;
    await requestSendTx(event.detail);
}, false)

// Listen background.js send event => post message to DAPP
extension.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { name } = request;
    if (name === INCOGNITO_EXTENSION_SEND_DATA) {
        handlePostMessageToDApp(request)
    }
    sendResponse(sender);
    return true;
});

