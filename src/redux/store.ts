import { createStore, applyMiddleware, combineReducers } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';
import { isToggleReduxLogger, isDev } from 'src/configs';
import { reducer as formReducer } from 'redux-form';
import camelCase from 'lodash/camelCase';

export interface IConfigStore {
    store: any;
    persistor: any;
}

const saga = createSagaMiddleware();

export const configStore = (preloadedState: any = {}) => {
    const requireModule = require.context('../../src', true, /\.reducer.ts/); // extract [reducerName].reducer.ts files inside redux folder
    const reducers: any = {};
    requireModule.keys().forEach((fileName: any) => {
        try {
            const reducerName = camelCase(fileName?.match(/(\w{1,})(.reducer.ts)/)[1]);
            reducers[reducerName] = requireModule(fileName).default;
        } catch (error) {
            console.debug(`ERROR`, error);
        }
    });
    const rootReducers = combineReducers({
        ...reducers,
        form: formReducer,
    });
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: [],
        blacklist: ['preload', 'wallet', 'account', 'token', 'setting', 'history', 'addressBook', 'password'],
    };
    const persistedReducer = persistReducer(persistConfig, rootReducers);
    const middlewareEnhancer = isDev
        ? isToggleReduxLogger
            ? applyMiddleware(thunk, saga, logger)
            : composeWithDevTools(applyMiddleware(thunk, saga))
        : applyMiddleware(thunk, saga);
    const store: any = createStore(persistedReducer, preloadedState, middlewareEnhancer);
    const persistor = persistStore(store);
    return { store, persistor };
};
