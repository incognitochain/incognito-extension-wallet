import React from 'react';
import { useDispatch } from 'react-redux';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { actionFetchHistory } from './History.actions';

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (
  props: IProps
) => {
  const dispatch = useDispatch();
  const handleFetchHistory = async () => {
    try {
      dispatch(actionFetchHistory());
    } catch (error) {
      console.debug(error);
    }
  };
  React.useEffect(() => {
    handleFetchHistory();
  }, []);
  return (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
};

export default compose<IProps, any>(enhance);
