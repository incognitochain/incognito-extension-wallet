import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import Spinner from 'react-bootstrap/esm/Spinner';
import { IWalletReducer, walletSelector } from 'src/module/Wallet';
import { Button } from 'src/components';
import { translateByFieldSelector } from 'src/module/Configs/Configs.selector';
import { IPreloadLanguage } from 'src/i18n';
import { actionFetch as actionPreloadApp } from './Preload.actions';
import { preloadSelector } from './Preload.selector';

const Styled = styled.div`
    > p {
        margin-top: 15px;
    }
`;

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps) => {
    const dispatch = useDispatch();
    const { loaded }: IWalletReducer = useSelector(walletSelector);
    const { error, isFetching: preloading, isFetched: preloaded } = useSelector(preloadSelector);
    const translate: IPreloadLanguage = useSelector(translateByFieldSelector)('preload');
    const handlePreload = () => dispatch(actionPreloadApp());
    React.useEffect(() => {
        handlePreload();
    }, []);
    if (preloading || !loaded || !preloaded) {
        return (
            <Styled className="preload-container">
                <Spinner animation="grow" />
                <p className="fw-medium fs-medium sub-text" dangerouslySetInnerHTML={{ __html: translate.title1 }} />
                {!!error && !preloaded && !preloading && (
                    <>
                        <p className="sub-text" dangerouslySetInnerHTML={{ __html: translate.title2 }} />
                        {!!error && <p className="sub-text">{error}</p>}
                        <Button title={translate.btnRetry} onClick={handlePreload} />
                    </>
                )}
            </Styled>
        );
    }
    return <WrappedComponent {...props} />;
};

export default compose<IProps, any>(enhance);
