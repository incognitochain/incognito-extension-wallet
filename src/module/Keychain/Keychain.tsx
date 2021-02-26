import React from 'react';
import { useSelector } from 'react-redux';
import { AddCircleIcon, Header, QuestionIcon } from 'src/components';
import { translateByFieldSelector } from 'src/module/Configs';
import { IKeychainLanguage } from 'src/i18n';
import { withLayout } from 'src/components/Layout';
import { useHistory } from 'react-router';
import { keyExplainedRoute } from 'src/module/KeysExplained';
import { route as routeAddKeys } from './features/AddKeys';
import { Styled } from './Keychain.styled';
import KeychainList from './features/KeychainList';

const Keychain = React.memo(() => {
    const history = useHistory();
    const translateKeychain: IKeychainLanguage = useSelector(translateByFieldSelector)('keychain');
    const handleClickHelp = () => {
        history.push(keyExplainedRoute);
    };
    const handleAdd = () => history.push(routeAddKeys);
    return (
        <Styled>
            <Header
                title=" "
                customHeader={
                    <div className="custom-header">
                        <div className="fw-medium fs-medium">{translateKeychain.headerTitle}</div>
                        <QuestionIcon onClick={handleClickHelp} />
                    </div>
                }
                rightHeader={<AddCircleIcon onClick={handleAdd} />}
            />
            <KeychainList />
        </Styled>
    );
});

export default withLayout(Keychain);
