import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compose } from 'recompose';
import styled from 'styled-components';
import { actionToggleToast, AppIcon, TOAST_CONFIGS } from 'src/components';
import { actionFetchSdkConfig } from './Preload.actions';
import { IPreloadReducer } from './Preload.reducer';
import { preloadSelector } from './Preload.selector';

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
    .app-icon {
        margin-bottom: 0;
    }
`;

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps) => {
    const dispatch = useDispatch();
    const { isFetching, isFetchedSdk }: IPreloadReducer = useSelector(preloadSelector);
    const handlePreload = async () => {
        try {
            await dispatch(actionFetchSdkConfig());
        } catch (error) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: error,
                    type: TOAST_CONFIGS.error,
                }),
            );
        }
    };
    React.useEffect(() => {
        handlePreload();
    }, []);
    if (isFetching && !isFetchedSdk) {
        return (
            <Styled className="preloading-container">
                <AppIcon />
                <p className="desc">
                    Entering incognito mode
                    <br />
                    for your crypto...
                </p>
            </Styled>
        );
    }
    if (!isFetchedSdk) {
        return (
            <Styled className="preloading-container">
                <AppIcon />
                <p className="desc">Something went wrong!</p>
            </Styled>
        );
    }
    return <WrappedComponent {...props} />;
};

export default compose<IProps, any>(enhance);
