import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/esm/Spinner';
import { IWalletReducer, walletSelector } from 'src/module/Wallet';
import { Button } from 'src/components';
import { actionFetch as actionPreloadApp } from './Preload.actions';
import { preloadSelector } from './Preload.selector';

const Styled = styled.div``;

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps) => {
    const dispatch = useDispatch();
    const { loaded }: IWalletReducer = useSelector(walletSelector);
    const { error, isFetching: preloading, isFetched: preloaded } = useSelector(preloadSelector);
    const handlePreload = () => dispatch(actionPreloadApp());
    React.useEffect(() => {
        handlePreload();
    }, []);
    if (preloading || !loaded || !preloaded) {
        return (
            <Styled className="preload-container">
                <Spinner animation="grow" />
                <p className="fw-medium fs-medium sub-text">
                    Entering incognito mode
                    <br />
                    for your crypto...
                </p>
                {!!error && !preloaded && !preloading && (
                    <>
                        <p className="sub-text">
                            Please check your connection or re-install the application
                            <br />
                            (only if you have a backup of your private keys) and try again.
                        </p>
                        {!!error && <p className="sub-text">{error}</p>}
                        <Button title="Retry" />
                    </>
                )}
            </Styled>
        );
    }
    return <WrappedComponent {...props} />;
};

export default compose<IProps, any>(enhance);
