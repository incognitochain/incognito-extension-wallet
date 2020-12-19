import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import { actionFetch as actionPreloadApp } from './Preload.actions';
import { IPreloadReducer } from './Preload.reducer';
import { preloadSelector } from './Preload.selector';
import Spinner from 'react-bootstrap/esm/Spinner';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';

const Styled = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  > p.desc {
    text-align: center;
    margin-top: 15px;
  }
`;

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (
  props: IProps
) => {
  const dispatch = useDispatch();
  const { isFetching }: IPreloadReducer = useSelector(preloadSelector);
  const handlePreload = async () => {
    try {
      await dispatch(actionPreloadApp());
    } catch (error) {
      dispatch(
        actionToggleToast({
          toggle: true,
          value: error,
          type: TOAST_CONFIGS.error,
        })
      );
    }
  };
  React.useEffect(() => {
    handlePreload();
  }, []);
  if (isFetching) {
    return (
      <Styled className='preloading-container'>
        <Spinner animation='grow' />
        <p className='desc'>
          Entering incognito mode
          <br />
          for your crypto...
        </p>
      </Styled>
    );
  }
  return <WrappedComponent {...props} />;
};

export default compose<IProps, any>(enhance);
