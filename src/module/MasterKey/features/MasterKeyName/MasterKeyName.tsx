import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { translateSelector } from 'src/module/Configs';
import { Button, Input } from 'src/components/Core';
import { trim } from 'lodash';
import enhance from './MasterKeyName.enhance';
import { IProps } from './MasterKeyName.inteface';
import FillCheckBox from '../../../../components/Core/FillCheckBox';

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

    .checkbox {
        margin-top: 15px;
        margin-bottom: 30px;
    }
`;

const MasterKeyName = (props: IProps) => {
    const { onChangeMasterKeyName, onNext, masterKeyName, error, agree, onAgree } = props;

    const translate = useSelector(translateSelector);
    const dictionary = translate.masterKey.newMasterKey;
    return (
        <Styled>
            <div className="input-wrapper">
                <Input
                    defaultValue={masterKeyName}
                    placeholder={dictionary.createMasterKeyName}
                    onChange={onChangeMasterKeyName}
                />
            </div>
            <div className="content">{dictionary.content}</div>
            <div className="content">{dictionary.content2}</div>
            <div className="checkbox">
                <FillCheckBox checked={agree} onHandleChecked={onAgree} label={dictionary.checkbox} />
            </div>
            <div>
                <Button
                    disabled={!trim(masterKeyName) || !!error || !agree}
                    onClick={onNext}
                    title={dictionary.createKey}
                />
                <div className="error-message">{error}</div>
            </div>
        </Styled>
    );
};

export default enhance(React.memo(MasterKeyName));
