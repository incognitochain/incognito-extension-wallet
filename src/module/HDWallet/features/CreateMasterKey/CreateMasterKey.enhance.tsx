import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createMasterKeySelector } from './CreateMasterKey.selector';
import { IReducer } from './CreateMasterKey.interface';
import { actionInitCreate, actionSetStepCreateMasterKey } from './CreateMasterKey.actions';
import { STEPS_CREATE } from './CreateMasterKey.constant';

interface IProps {
    onGoBack?: () => any;
}

interface TInner {}

export interface IMergeProps extends IProps, TInner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { step }: IReducer = useSelector(createMasterKeySelector);
    const { onGoBack: onGoBackFromProps }: IProps = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const onGoBack = () => {
        switch (step) {
            case STEPS_CREATE.createMasterKeyName: {
                dispatch(actionInitCreate());
                if (typeof onGoBackFromProps === 'function') {
                    onGoBackFromProps();
                } else {
                    history.goBack();
                }
                break;
            }
            case STEPS_CREATE.createMasterKeyMnemonic: {
                dispatch(actionSetStepCreateMasterKey(STEPS_CREATE.createMasterKeyName));
                break;
            }
            case STEPS_CREATE.verifyMasterKeyMnemonic: {
                dispatch(actionSetStepCreateMasterKey(STEPS_CREATE.createMasterKeyMnemonic));
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
