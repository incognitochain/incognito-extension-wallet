'use strict';

const INCOGNITO_EXTENSION_SEND_DATA 
= 'INCOGNITO_EXTENSION_SEND_DATA';

// MESSAGE BACKGROUND LISTEN
const BACKGROUND_LISTEN = {
    SELECTED_CONNECT_ACCOUNT: 'BACKGROUND_SELECTED_CONNECT_ACCOUNT',
    LOADED_FOLLOWED_BALANCE: 'BACKGROUND_LOADED_FOLLOWED_BALANCE',
    REQUEST_CONNECT_ACCOUNT: 'BACKGROUND_REQUEST_CONNECT_ACCOUNT',
    REQUEST_SEND_TX: 'BACKGROUND_REQUEST_SEND_TX',
    REQUEST_RELOAD_ACCOUNT: 'BACKGROUND_REQUEST_RELOAD_ACCOUNT',
    DISCONNECT_ACCOUNT: 'BACKGROUND_DISCONNECT_ACCOUNT',
    CHECK_IS_CONNECTED: 'BACKGROUND_CHECK_IS_CONNECTED',
    SEND_TX_FINISH: 'BACKGROUND_SEND_TX_FINISH',
    CLEAR_SEND_CURRENT_REQUEST: 'BACKGROUND_CLEAR_SEND_CURRENT_REQUEST',
    GET_PASS_WORK: 'BACKGROUND_GET_PASS_WORK',
    UPDATE_PASS_WORK: 'BACKGROUND_UPDATE_PASS_WORK',
};

const apis = [
  'alarms',
  'bookmarks',
  'browserAction',
  'commands',
  'contextMenus',
  'cookies',
  'downloads',
  'events',
  'extension',
  'extensionTypes',
  'history',
  'i18n',
  'idle',
  'notifications',
  'pageAction',
  'runtime',
  'storage',
  'tabs',
  'webNavigation',
  'webRequest',
  'windows',
];

const hasChrome = typeof chrome !== 'undefined';
const hasWindow = typeof window !== 'undefined';
const hasBrowser = typeof browser !== 'undefined';

class Browser {
  constructor() {
    const _this = this;

    apis.forEach(function (api) {

      _this[api] = null;

      if (hasChrome) {
        try {
          if (chrome[api]) {
            _this[api] = chrome[api];
          }
        } catch (e) {
        }
      }

      if (hasWindow) {
        try {
          if (window[api]) {
            _this[api] = window[api];
          }
        } catch (e) {
        }
      }

      if (hasBrowser) {
        try {
          if (browser[api]) {
            _this[api] = browser[api];
          }
        } catch (e) {
        }
        try {
          _this.api = browser.extension[api];
        } catch (e) {
        }
      }
    });

    if (hasBrowser) {
      try {
        if (browser && browser.runtime) {
          this.runtime = browser.runtime;
        }
      } catch (e) {
      }

      try {
        if (browser && browser.browserAction) {
          this.browserAction = browser.browserAction;
        }
      } catch (e) {
      }
    }
  }
}

const extension = new Browser();

const formatData = (data) => {
    data = {
        ...data,
        actionKey: `INCOGNITO_EXTENSION|${data.origin}`,
        actionName: data.key
    };
    delete data['name'];
    delete data['origin'];
    return data;
};
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
            resolve(response);
        });
    })
);

// Request Connect account within extension
const requestSendTx = async (data) => (
    new Promise((resolve) => {
        extension.runtime.sendMessage(Object.assign({ name: BACKGROUND_LISTEN.REQUEST_SEND_TX }, data), (response) => {
            resolve(response);
        });
    })
);

// Client request Connect account
window.addEventListener(BACKGROUND_LISTEN.REQUEST_CONNECT_ACCOUNT, async () => {
    await requestConnectAccount();
}, false);

// Client request Connect account
window.addEventListener(BACKGROUND_LISTEN.REQUEST_SEND_TX, async (event) => {
    if (!event.detail) return;
    await requestSendTx(event.detail);
}, false);

// Listen background.js send event => post message to DAPP
extension.runtime.onMessage.addListener((request, sender, sendResponse) => {
    const { name } = request;
    if (name === INCOGNITO_EXTENSION_SEND_DATA) {
        handlePostMessageToDApp(request);
    }
    sendResponse(sender);
    return true;
});
