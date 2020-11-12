import React, { FunctionComponent } from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { GlobalStyled } from 'src/styles/index';
import { Provider } from 'react-redux';
import { configStore, IConfigStore } from 'src/redux/index';
import { PersistGate } from 'redux-persist/integration/react';
import { compose } from 'recompose';
import { withPreload } from './routes/Preload';
import Modal from 'src/components/Modal';

const { store, persistor }: IConfigStore = configStore();

interface IProps {}

const enhance = (WrappedComponent: FunctionComponent) => (props: IProps) => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <GlobalStyled />
          <WrappedComponent {...props} />
          <Modal />
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  );
};

export default compose(enhance, withPreload);
