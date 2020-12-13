import React from 'react';
import { useSelector } from 'react-redux';
import { Field, InjectedFormProps } from 'redux-form';
import { Button, Header } from 'src/components';
import { InputField, required } from 'src/components/ReduxForm';
import { IAddressBookLanguage } from 'src/i18n/interface';
import { translateByFieldSelector } from 'src/module/Configs';
import styled from 'styled-components';
import withCreate, { IMergeProps } from './Create.enhance';

const Styled = styled.div``;

const Create = (props: IMergeProps & InjectedFormProps & any) => {
  const translate: IAddressBookLanguage = useSelector(translateByFieldSelector)(
    'addressBook'
  );
  const { handleSubmit, handleCreate, valid } = props;
  return (
    <Styled>
      <Header title={translate.headerTitleCreate} />
      <form onSubmit={handleSubmit(handleCreate)}>
        <Field
          component={InputField}
          name='name'
          label={translate.name}
          validate={[required]}
          componentProps={{
            placeholder: translate.name,
            autoFocus: true,
            maxLength: 50,
          }}
        />
        <Field
          component={InputField}
          name='address'
          label={translate.address}
          validate={[required]}
          componentProps={{
            placeholder: translate.address,
            // readOnly: true,
          }}
        />
        <Button title={translate.btnCreate} type='submit' disabled={!valid} />
      </form>
    </Styled>
  );
};

export default withCreate(Create);
