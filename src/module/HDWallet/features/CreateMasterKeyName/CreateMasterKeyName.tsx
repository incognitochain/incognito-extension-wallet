import React from 'react';
import { useSelector } from 'react-redux';
import { IHDWalletLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import styled from 'styled-components';
import { createMasterKeySelector, IReducer } from 'src/module/HDWallet/features/CreateMasterKey';
import { InputField, validator } from 'src/components/ReduxForm';
import { Field } from 'redux-form';
import FillCheckBox from 'src/components/Core/FillCheckBox';
import { Button } from 'src/components';
import { useValidator } from 'src/hooks';
import withCreateMasterKeyName, { IMergeProps } from './CreateMasterKeyName.enhance';
import { FORM_CONFIGS } from './CreateMasterKeyName.constant';

const Styled = styled.div`
    .hook {
        .desc:first-child {
            margin-top: 30px;
            margin-bottom: 15px;
        }
    }
    .btn-fill-check-box {
        margin: 30px 0;
    }
`;

const CreateMasterKeyName = (props: IMergeProps & any) => {
    const translate: IHDWalletLanguage = useSelector(translateByFieldSelector)('hdWallet');
    const { onHandleChecked, disabled, onHandleReady }: IMergeProps = props;
    const { invalidMasterKeyName } = translate.error;
    const { desc1, desc2, agreeDesc, btnReady } = translate.createMasterKeyName;
    const { masterKeyNamePlaceholder } = translate.general;
    const { agree }: IReducer = useSelector(createMasterKeySelector);
    const [validate]: any[] = useValidator({
        validator: [validator.required, validator.validateAlphaNumericText(invalidMasterKeyName)],
    });
    return (
        <Styled>
            <form>
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.masterKeyName}
                    validate={[...validate]}
                    componentProps={{
                        placeholder: masterKeyNamePlaceholder,
                    }}
                />
            </form>
            <div className="hook">
                <p className="desc">{desc1}</p>
                <p className="desc">{desc2}</p>
            </div>
            <FillCheckBox checked={agree} onHandleChecked={onHandleChecked} label={agreeDesc} />
            <Button title={btnReady} disabled={disabled} onClick={onHandleReady} />
        </Styled>
    );
};

export default withCreateMasterKeyName(React.memo(CreateMasterKeyName));
