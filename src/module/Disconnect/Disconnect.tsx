import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'src/components';
import { IDisconnectLanguage } from 'src/i18n';
import DisconnectItem from 'src/module/Disconnect/features/DisconnectItem';
import { actionClearRequestFromDApp as clearRequestFromDApp } from 'src/module/Preload';
import { translateByFieldSelector } from '../Configs';
import withEnhance from './Disconnect.enhance';
import { Styled } from './Disconnect.styled';

const Disconnect = React.memo(() => {
    const translate: IDisconnectLanguage = useSelector(translateByFieldSelector)('disconnect');
    const dispatch = useDispatch();
    return (
        <Styled>
            <Header title={translate.headerTitle} onGoBack={() => dispatch(clearRequestFromDApp())} />
            <p className="sub-title fw-regular">{translate.subTitle}</p>
            <DisconnectItem />
        </Styled>
    );
});

export default withEnhance(Disconnect);
