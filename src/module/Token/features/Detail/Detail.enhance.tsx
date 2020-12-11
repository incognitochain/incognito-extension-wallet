import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { actionFetchCacheHistory } from 'src/module/History';
import { selectedTokenIdSelector } from 'src/module/Token';

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (
  props: IProps
) => {
  const dispatch = useDispatch();
  const selectedPrivacyTokenId = useSelector(selectedTokenIdSelector);
  const fetchData = async () => {
    try {
      dispatch(actionFetchCacheHistory());
    } catch (error) {
      dispatch(
        actionToggleToast({
          toggle: true,
          value: error?.message || JSON.stringify(error),
          type: TOAST_CONFIGS.error,
        })
      );
    }
  };
  React.useEffect(() => {
    fetchData();
  }, [selectedPrivacyTokenId]);
  return (
    <ErrorBoundary>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );
};

export default compose<IProps, any>(withLayout, enhance);
