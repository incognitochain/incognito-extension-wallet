export const getActiveTabs = () => {
    return new Promise((resolve) => {
        chrome.tabs.query({ active: true }, (tabs) => {
            return resolve(tabs);
        });
    });
};
