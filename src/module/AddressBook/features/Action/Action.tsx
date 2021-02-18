import React from 'react';
import { useSelector } from 'react-redux';
import { Field, InjectedFormProps } from 'redux-form';
import { Button, Header } from 'src/components';
import { InputField, validator } from 'src/components/ReduxForm';
import { IAddressBookLanguage } from 'src/i18n/interface';
import { translateByFieldSelector } from 'src/module/Configs';
import styled from 'styled-components';
import withAction, { IMergeProps } from './Action.enhance';

const Styled = styled.div`
    .btn-container {
        margin-top: 30px;
    }
`;

const Action = (props: IMergeProps & InjectedFormProps & any) => {
    const translate: IAddressBookLanguage = useSelector(translateByFieldSelector)('addressBook');
    const { handleSubmit, handleAction, disabledForm, isCreate }: IMergeProps & InjectedFormProps = props;
    return (
        <Styled>
            <Header title={isCreate ? translate.headerTitleCreate : translate.headerTitleEdit} />
            <form onSubmit={handleSubmit(handleAction)}>
                <Field
                    component={InputField}
                    name="name"
                    label={translate.name}
                    validate={[validator.required]}
                    componentProps={{
                        placeholder: translate.name,
                        autoFocus: true,
                        maxLength: 50,
                    }}
                />
                <Field
                    component={InputField}
                    name="address"
                    label={translate.address}
                    validate={[validator.required]}
                    componentProps={{
                        placeholder: translate.address,
                        readOnly: true,
                    }}
                />
                <Button
                    title={isCreate ? translate.btnCreate : translate.btnEdit}
                    type="submit"
                    disabled={disabledForm}
                />
            </form>
        </Styled>
    );
};

export default withAction(Action);
