import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { actionSetSelectedToken } from 'src/module/Token';
import { route as routeSend } from 'src/module/Send';
import { getURLSearchParams } from 'src/utils';
import {
    route as routeCreateMasterKey,
    actionSetStepCreateMasterKey,
    pathName as pathCreateMasterKey,
    STEPS_CREATE,
} from 'src/module/HDWallet/features/CreateMasterKey';
import { actionSetActionType, ACTION_TYPES } from 'src/module/HDWallet';
import { MODE } from 'src/module/Preload';

interface IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const handleQueryString = async () => {
        try {
            const urlParams: any = getURLSearchParams();
            const page = urlParams.get('page');
            switch (page) {
                case 'send': {
                    const tokenId = urlParams.get('tokenId');
                    if (!!tokenId && typeof tokenId === 'string') {
                        await dispatch(actionSetSelectedToken(tokenId));
                        history.push(`${routeSend}/${tokenId}`);
                    }
                    break;
                }
                case pathCreateMasterKey: {
                    dispatch(actionSetActionType(ACTION_TYPES.CREATE));
                    dispatch(actionSetStepCreateMasterKey(STEPS_CREATE.createMasterKeyName));
                    history.push(routeCreateMasterKey, {
                        shouldRedirectToKeyChain: true,
                        showToast: true,
                        mode: MODE.browser,
                    });
                    break;
                }
                default:
                    break;
            }
        } catch (error) {
            console.debug(error);
        }
    };
    React.useEffect(() => {
        handleQueryString();
    }, []);
    return (
        <ErrorBoundary>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(enhance);
