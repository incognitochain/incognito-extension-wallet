import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { isTab } from './utils';

const rootEl = document.getElementById('root');

ReactDOM.render(<App />, rootEl);

if (isTab() && rootEl) {
    rootEl.className += ' incognito-extension-tab';
}

if (module.hot) {
    module.hot.accept();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
