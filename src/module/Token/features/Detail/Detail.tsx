import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Header } from 'src/components';
import { ILanguage } from 'src/i18n';
import { themeSelector, translateSelector } from 'src/module/Configs';
import { Amount, Balance, ISelectedPrivacy, selectedPrivacySelector, PerChange } from 'src/module/Token';
import { route as routeTokenInfo } from 'src/module/Token/features/TokenInfo';
import { combineHistorySelector, HistoryList, receiveHistorySelector } from 'src/module/History';
import { route as routeSend } from 'src/module/Send';
import { useHistory } from 'react-router-dom';
import { InfoIcon, LoadingIcon, VerifiedIcon } from 'src/components/Icons';
import { route as routeWallet } from 'src/module/Wallet';
import withDetail, { IMergedProps } from './Detail.enhance';
import { Styled } from './Detail.styled';

const TokenBalance = React.memo(() => {
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const { tokenId } = selectedPrivacy;
    return (
        <div className="token-balance">
            <div className="hook-container">
                <Amount
                    loadingIconProps={{ width: '30px', height: '30px' }}
                    tokenId={tokenId}
                    classNameTextCustom="fw-medium fs-avglarge amount-token"
                    showVerifiedToken
                    showSymbol={false}
                />
                {selectedPrivacy.isVerified && <VerifiedIcon />}
            </div>
            <div className="hook-container">
                <Balance tokenId={tokenId} classNameTextCustom="balance-token" />
                <PerChange tokenId={tokenId} />
            </div>
        </div>
    );
});

export const GroupButton = React.memo(() => {
    const translate: ILanguage = useSelector(translateSelector);
    const translateDetail = translate.token.detail;
    const history = useHistory();
    const handleSend = () => {
        history.push(routeSend);
    };
    return <Button title={translateDetail.btnSend} onClick={handleSend} />;
});

const Detail = React.memo((props: IMergedProps & any) => {
    const { fetchData, handleOnEndReached }: IMergedProps = props;
    const token = useSelector(selectedPrivacySelector);
    const theme = useSelector(themeSelector);
    const histories = useSelector(combineHistorySelector);
    const { oversize, page } = useSelector(receiveHistorySelector);
    const shouldRenderFooter = !oversize && page !== 1;
    const history = useHistory();
    return (
        <Styled theme={theme}>
            <Header
                onGoBack={() => history.push(routeWallet)}
                title={token.name}
                customHeader={<InfoIcon onClick={() => history.push(routeTokenInfo)} />}
                refreshPage
                handleRefreshPage={fetchData}
            />
            <TokenBalance />
            <GroupButton />
            <HistoryList
                handleOnEndReached={handleOnEndReached}
                histories={histories}
                renderFooter={shouldRenderFooter && <LoadingIcon />}
            />
        </Styled>
    );
});

export default withDetail(Detail);
