import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import { createMasterKeySelector } from './CreateMasterKey.selector';
import { IReducer } from './CreateMasterKey.interface';
import { actionInitCreate, actionSetStep } from './CreateMasterKey.actions';
import { STEPS_CREATE } from './CreateMasterKey.constant';

interface IProps {
    onGoBack: () => any;
}

interface TInner {}

export interface IMergeProps extends IProps, TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { step }: IReducer = useSelector(createMasterKeySelector);
    const { onGoBack: onGoBackFromProps }: IProps = props;
    const dispatch = useDispatch();
    const onGoBack = () => {
        switch (step) {
            case STEPS_CREATE.createMasterKeyName: {
                dispatch(actionInitCreate());
                onGoBackFromProps();
                break;
            }
            case STEPS_CREATE.createMasterKeyMnemonic: {
                dispatch(actionSetStep(STEPS_CREATE.createMasterKeyName));
                break;
            }
            case STEPS_CREATE.verifyMasterKeyMnemonic: {
                dispatch(actionSetStep(STEPS_CREATE.createMasterKeyMnemonic));
                break;
            }
            default:
                break;
        }
    };
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, onGoBack }} />
        </ErrorBoundary>
    );
};

export default compose<IProps, any>(enhance);
