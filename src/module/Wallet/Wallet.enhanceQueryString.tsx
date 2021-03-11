import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { actionSetSelectedToken } from 'src/module/Token';
import { route as routeSend } from 'src/module/Send';
import { getURLSearchParams } from 'src/utils';
import { route as routeBridge } from 'src/module/Bridge';

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
                case 'bridge': {
                    history.push(routeBridge.path);
                    break;
                }
                default:
                    break;
            }
            history.push(routeBridge.path);
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
