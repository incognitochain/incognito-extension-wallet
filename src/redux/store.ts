import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import createSagaMiddleware from 'redux-saga';
import { ENVS } from 'src/configs';

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
    blacklist: ['preload', 'home', 'wallet', 'account'],
  };
  const persistedReducer = persistReducer(persistConfig, reducers);
  const middlewareEnhancer = applyMiddleware(thunk, saga);
  const composedEnhancers =
    ENVS.REACT_APP_MODE === 'development'
      ? composeWithDevTools(middlewareEnhancer)
      : middlewareEnhancer;
  const store: any = createStore(
    persistedReducer,
    preloadedState,
    composedEnhancers
  );
  let persistor = persistStore(store);
  return { store, persistor };
};
