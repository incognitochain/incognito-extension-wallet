export const getActiveTabs = () => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true }, (tabs) => {
            return resolve(tabs);
        });
    });
};

export const getLastFocusedWindow = () => {
    return new Promise((resolve) => {
        chrome.windows.getLastFocused((windowObject) => {
            return resolve(windowObject);
        });
    });
};
