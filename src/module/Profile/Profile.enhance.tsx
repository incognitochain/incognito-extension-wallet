import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { apiGetProfile, getToken } from 'incognito-js/build/web/browser';
import { camelCaseKeys } from 'src/utils/object';
import { useSelector } from 'react-redux';
import Header from '../../components/Header/Header';
import { authTokenSelector } from '../Preload';

const enhance = (WrappedComp: React.FunctionComponent) => (props: any) => {
    const [userProfile, setUserProfile] = React.useState({});
    const { deviceId, deviceToken } = useSelector(authTokenSelector);
    const onGetProfile = async () => {
        try {
            let profile = camelCaseKeys(await apiGetProfile());
            if (deviceId && deviceToken) {
                const token = await getToken(deviceId, deviceToken);
                profile = { ...profile, token };
            }
            setUserProfile(profile);
        } catch (e) {
            console.debug('Get user profile with error: ', e);
        }
    };
    React.useEffect(() => {
        onGetProfile().then();
    }, []);
    return (
        <ErrorBoundary>
            <Header title="User Profile" />
            <WrappedComp
                {...{
                    ...props,
                    userProfile,
                }}
            />
        </ErrorBoundary>
    );
};
export default enhance;
