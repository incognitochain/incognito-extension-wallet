import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useSelector } from 'react-redux';
import Header from 'src/components/Header/Header';
import { profileSelector } from './Profile.selector';
import { IProfileReducer } from './Profile.reducer';

const enhance = (WrappedComp: React.FunctionComponent) => (props: any) => {
    const { data: userProfile }: IProfileReducer = useSelector(profileSelector);
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
