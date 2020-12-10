import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import { IPreloadReducer, preloadSelector } from 'src/routes/Preload';
import {
  actionFollowPopularToken,
  IEnvToken,
  ITokenReducer,
  tokenSelector,
} from 'src/routes/Token';

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (
  props: IProps
) => {
  const dispatch = useDispatch();
  const preload: IPreloadReducer = useSelector(preloadSelector);
  const tokenState: ITokenReducer = useSelector(tokenSelector);
  const { mainnet } = preload.configs;
  const field = mainnet ? 'mainnet' : 'testnet';
  const envToken: IEnvToken = tokenState[field];
  const { followedPopularIds } = envToken;
  const handlePreloadHome = async () => {
    try {
      if (!followedPopularIds) {
        await dispatch(actionFollowPopularToken());
      }
    } catch (error) {
      console.debug(error);
    }
  };
  React.useEffect(() => {
    handlePreloadHome();
  }, []);
  return <WrappedComponent {...props} />;
};

export default compose<IProps, any>(enhance);
