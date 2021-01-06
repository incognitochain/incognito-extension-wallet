import React, { useCallback, useState } from 'react';
import { compose } from 'recompose';
import { trim } from 'lodash';
import { withLayout } from 'src/components/Layout';
import { validator } from 'src/utils';
import { useSelector } from 'react-redux';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/module/Configs';
import { IProps } from './MasterKeyName.inteface';

const enhance = (WrappedComponent: any) => (props: IProps) => {
    const { onChangeMasterKeyName } = props;

    const [masterKeyName, setMasterKeyName] = useState('');
    const [error, setError] = useState('');

    const translate: ILanguage = useSelector(translateSelector);
    const errorDictionary = translate.error;

    const handleChangeName = useCallback((e) => {
        const name = trim(e.target.value);
        setMasterKeyName(name);

        if (!validator.validateAlphaNumericText(name)) {
            return setError(errorDictionary.invalidMasterKeyName);
        }

        return setError('');
    }, []);

    const handleNext = useCallback(() => {
        onChangeMasterKeyName(masterKeyName);
    }, [masterKeyName]);

    return (
        <WrappedComponent
            {...props}
            error={error}
            onNext={handleNext}
            onChangeMasterKeyName={handleChangeName}
            masterKeyName={masterKeyName}
        />
    );
};

export default compose<IProps, any>(withLayout, enhance);
