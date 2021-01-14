import React from 'react';
import { useSelector } from 'react-redux';
import { ILanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateSelector } from 'src/module/Configs';
import { Button, Input } from 'src/components/Core';
import enhance from './MasterKeyName.enhance';
import { IProps } from './MasterKeyName.inteface';

const Styled = styled.div`
    .content {
        padding-bottom: 15px;
    }

    .input-wrapper {
        margin-bottom: 30px;

        > div:first-child {
            margin-bottom: 15px;
        }
    }

    .actions {
        margin-top: 15px;
    }
`;

const MasterKeyName = (props: IProps) => {
    const { onChangeMasterKeyName, onNext, masterKeyName, error } = props;

    const translate = useSelector(translateSelector);
    const dictionary = translate.masterKey.newMasterKey;
    return (
        <Styled>
            <div className="input-wrapper">
                <Input defaultValue="" placeholder={dictionary.createMasterKeyName} onChange={onChangeMasterKeyName} />
            </div>
            <div className="content">{dictionary.content}</div>
            <div className="content">{dictionary.content2}</div>
            <div className="actions">
                <Button disabled={!masterKeyName || !!error} onClick={onNext} title={dictionary.createKey} />
                <div className="error-message">{error}</div>
            </div>
        </Styled>
    );
};

export default enhance(React.memo(MasterKeyName));
