import React from 'react';
import { compose } from 'recompose';
import { change, formValueSelector, InjectedFormProps, isValid, reduxForm } from 'redux-form';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { detectBEP2Token, detectERC20Token, addBEP2Token, addERC20Token } from 'incognito-js/build/web/browser';
import {
    IAddManually,
    actionAddingManuallyToken,
    actionFetchedDetectTokenAddManually,
    actionFetchingDetectTokenAddManually,
    actionFetchPCustomTokenList,
    actionFetchPTokenList,
    actionFollowTokenById,
    actionFreeAddManually,
} from 'src/module/Token';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash/debounce';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import {
    selectedAddManuallySelector,
    detectTokenAddManuallySelector,
    addManuallySelector,
} from 'src/module/Token/Token.selector';
import { ERROR_MESSAGE } from 'src/constants/error';
import isEmpty from 'lodash/isEmpty';
import { useHistory } from 'react-router-dom';
import { FORM_CONFIGS } from './AddManually.constant';

interface IProps {}

interface TInner {
    handleAddManually: (props: any) => any;
    disabledForm: boolean;
}

export interface IMergeProps extends IProps, TInner, InjectedFormProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { type: typeSelected }: IAddManually = useSelector(selectedAddManuallySelector);
    const history = useHistory();
    const { token } = useSelector(detectTokenAddManuallySelector);
    const selector = formValueSelector(FORM_CONFIGS.formName);
    const { adding } = useSelector(addManuallySelector);
    const value = useSelector((state) => selector(state, FORM_CONFIGS.value));
    const isFormValid = useSelector((state) => isValid(FORM_CONFIGS.formName)(state));
    const dispatch = useDispatch();
    const disabledForm = !token || !isFormValid || adding;
    const handleDetectToken = async (value: string, typeSelected: number, adding: boolean) => {
        let data;
        if (isEmpty(value) || adding) {
            return;
        }
        await dispatch(actionFetchingDetectTokenAddManually());
        try {
            switch (typeSelected) {
                case 1: {
                    // BEP2
                    data = await detectBEP2Token(value);
                    break;
                }
                case 2: {
                    // ERC20
                    data = await detectERC20Token(value);
                    break;
                }
                default:
                    break;
            }
            if (!data?.name || !data?.symbol) {
                data = null;
                switch (typeSelected) {
                    case 1:
                        throw new Error(ERROR_MESSAGE.CAN_NOT_DETECT_BEP2_TOKEN);
                    case 2:
                        throw new Error(ERROR_MESSAGE.CAN_NOT_DETECT_ERC20_TOKEN);
                    default:
                        break;
                }
            }
        } catch (error) {
            dispatch(actionToggleToast({ toggle: true, value: error, type: TOAST_CONFIGS.error }));
        } finally {
            await dispatch(actionFetchedDetectTokenAddManually(data || null));
        }
    };
    const _handleDetectToken = React.useRef(debounce(handleDetectToken, 800));
    const handleAddManually = async () => {
        if (disabledForm) {
            return null;
        }
        try {
            let tokenId;
            let result;
            await dispatch(actionAddingManuallyToken(true));
            switch (typeSelected) {
                case 1: {
                    result = await addBEP2Token(token);
                    break;
                }
                case 2: {
                    result = await addERC20Token(token);
                    break;
                }
                default:
                    break;
            }
            if (result?.TokenID) {
                tokenId = result?.TokenID;
                await Promise.all([dispatch(actionFetchPTokenList(true)), dispatch(actionFetchPCustomTokenList(true))]);
                await Promise.all([
                    dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.value, '')),
                    dispatch(actionFollowTokenById(tokenId)),
                    dispatch(
                        actionToggleToast({
                            toggle: true,
                            value: ERROR_MESSAGE.ADDED_MANUALLY_TOKEN,
                            type: TOAST_CONFIGS.success,
                        }),
                    ),
                ]);
                history.goBack();
            } else {
                throw new Error(ERROR_MESSAGE.ADD_FAIL_MANUALLY_TOKEN);
            }
        } catch (error) {
            dispatch(actionToggleToast({ toggle: true, value: error, type: TOAST_CONFIGS.error }));
        } finally {
            await dispatch(actionAddingManuallyToken(false));
        }
    };
    React.useEffect(() => {
        _handleDetectToken.current(value, typeSelected, adding);
    }, [value, typeSelected, adding]);
    React.useEffect(() => {
        return () => {
            dispatch(actionFreeAddManually());
        };
    }, []);
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, handleAddManually, disabledForm }} />
        </ErrorBoundary>
    );
};

export default compose<IMergeProps, any>(
    reduxForm({
        form: FORM_CONFIGS.formName,
    }),
    enhance,
);
