import React from 'react';
import withSend, { IMergeProps } from './Send.enhance';
import FormSend from './FormSend';
import FormForceSend from './FormForceSend';

const Send = (props: IMergeProps & any) => {
    const { forceSendData } = props;
    const renderForm = () => {
        if (!forceSendData) return <FormForceSend {...props} />;
        return <FormSend {...props} />;
    };
    return renderForm();
};

export default withSend(Send);
