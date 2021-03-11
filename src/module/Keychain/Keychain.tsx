import React from 'react';
import { useSelector } from 'react-redux';
import { AddCircleIcon, Header, QuestionIcon } from 'src/components';
import { translateByFieldSelector } from 'src/module/Configs';
import { IKeychainLanguage } from 'src/i18n';
import { useHistory } from 'react-router';
import { keyExplainedRoute } from 'src/module/KeysExplained';
import { route as routeSetting } from 'src/module/Setting';
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
                onGoBack={() => history.push(routeSetting)}
                customHeader={
                    <div className="custom-header flex">
                        <p className="fw-medium fs-medium">{translateKeychain.headerTitle}</p>
                        <QuestionIcon width={19} height={19} onClick={handleClickHelp} />
                    </div>
                }
                rightHeader={<AddCircleIcon onClick={handleAdd} />}
            />
            <KeychainList />
        </Styled>
    );
});

export default Keychain;
