import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { change, Field } from 'redux-form';
import { Button, Header, TyniButton } from 'src/components';
import { InputField, validator } from 'src/components/ReduxForm';
import { ITokenLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import styled from 'styled-components';
import {
    addManuallySelector,
    detectTokenAddManuallySelector,
    selectedAddManuallySelector,
} from 'src/module/Token/Token.selector';
import { IAddManually, actionChangeTypeAddManually } from 'src/module/Token';
import { FORM_CONFIGS, ADD_MANUALLY_TYPES } from './AddManually.constant';
import withAddManually, { IMergeProps } from './AddManually.enhance';

const Styled = styled.div`
    .hook {
        justify-content: space-between;
        margin-bottom: 15px;
        font-size: 13px;
    }
    .form-item {
        justify-content: space-between;
        margin-top: 15px;
    }
`;

const Item = React.memo((props: { data: IAddManually }) => {
    const { data } = props;
    const { value, type } = data;
    const { type: typeSelected }: IAddManually = useSelector(selectedAddManuallySelector);
    const dispatch = useDispatch();
    const handleChangeType = async () => {
        await dispatch(change(FORM_CONFIGS.formName, FORM_CONFIGS.value, ''));
        await dispatch(actionChangeTypeAddManually(data));
    };
    return <TyniButton onClick={handleChangeType} title={value} selected={type === typeSelected} />;
});

const ExtraItem = React.memo((props: { title: string; desc: string }) => {
    const { title, desc } = props;
    return (
        <div className="form-item flex">
            <p className="fw-medium">{title}: </p>
            <p className="fw-medium ellipsis">{desc}</p>
        </div>
    );
});

const Extra = React.memo((props: IMergeProps & any) => {
    const translate: ITokenLanguage = useSelector(translateByFieldSelector)('token');
    const { selectTokenType, btnAction, symbol, name } = translate.addManually;
    const { placeholder }: IAddManually = useSelector(selectedAddManuallySelector);
    const { handleSubmit, handleAddManually, disabledForm }: IMergeProps = props;
    const { fetching, token } = useSelector(detectTokenAddManuallySelector);
    const { adding } = useSelector(addManuallySelector);
    return (
        <div className="extra">
            <div className="hook flex">
                <p className="fs-medium fw-medium">{selectTokenType}</p>
                <div className="sub flex">
                    {Object.entries(ADD_MANUALLY_TYPES).map(([key, value]) => (
                        <Item data={value} key={key} />
                    ))}
                </div>
            </div>
            <form onSubmit={handleSubmit(handleAddManually)}>
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.value}
                    componentProps={{
                        placeholder,
                        autoFocus: true,
                    }}
                    validate={[validator.required]}
                />
                {token?.name && <ExtraItem title={name} desc={token?.name} />}
                {token?.symbol && <ExtraItem title={symbol} desc={token?.originalSymbol || token?.symbol} />}
                <Button
                    type="submit"
                    disabled={disabledForm}
                    title={`${btnAction}${fetching || adding ? '...' : ''}`}
                    className="m-t-30"
                />
            </form>
        </div>
    );
});

const AddManually = (props: IMergeProps) => {
    const translate: ITokenLanguage = useSelector(translateByFieldSelector)('token');
    const { headerTitle } = translate.addManually;
    return (
        <Styled>
            <Header title={headerTitle} />
            <Extra {...props} />
        </Styled>
    );
};

export default withAddManually(AddManually);
