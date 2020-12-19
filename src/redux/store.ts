import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';
import { ENVS } from 'src/configs';
import reducers from './reducers';

export interface IConfigStore {
    store: any;
    persistor: any;
}

const saga = createSagaMiddleware();

export const configStore = (preloadedState: any = {}) => {
    const persistConfig = {
        key: 'root',
        storage,
        whitelist: [],
        blacklist: ['preload', 'wallet', 'account', 'token', 'setting', 'history', 'addressBook'],
    };
    const persistedReducer = persistReducer(persistConfig, reducers);
    const middlewareEnhancer = applyMiddleware(thunk, saga);
    const composedEnhancers =
        ENVS.REACT_APP_MODE === 'development' ? composeWithDevTools(middlewareEnhancer) : middlewareEnhancer;
    const store: any = createStore(persistedReducer, preloadedState, composedEnhancers);
    const persistor = persistStore(store);
    return { store, persistor };
};
