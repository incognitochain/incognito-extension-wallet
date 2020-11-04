import React, { FunctionComponent, useEffect } from 'react';
// import 'react-hot-loader';
import { goServices, getConfig } from 'incognito-js/build/web/module';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { GlobalStyled } from 'src/styles/index';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configStore, IConfigStore } from 'src/redux/index';
import { PersistGate } from 'redux-persist/integration/react';

const { store, persistor }: IConfigStore = configStore();

interface IProps {}

const enhance = (WrappedComponent: FunctionComponent) => (props: IProps) => {
  const handleLoadWebAssembly = async () => {
    try {
      const result = await goServices.implementGoMethodUseWasm();
      console.debug(`CONFIG`, getConfig(), result);
    } catch (error) {
      console.debug(`error`, error);
    }
  };
  useEffect(() => {
    handleLoadWebAssembly();
  }, []);
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <GlobalStyled />
            <WrappedComponent {...props} />
          </Router>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default enhance;
