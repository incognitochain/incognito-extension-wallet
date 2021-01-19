import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header } from 'src/components';
import { ILanguage, ITokenLanguage } from 'src/i18n';
import { themeSelector, translateByFieldSelector, translateSelector } from 'src/module/Configs';
import { Amount, Balance, ISelectedPrivacy, selectedPrivacySelector } from 'src/module/Token';
import { route as routeTokenInfo } from 'src/module/Token/features/TokenInfo';
import { combineHistorySelector, HistoryList, historySelector, receiveHistoryDataSelector } from 'src/module/History';
import { route as routeSend } from 'src/module/Send';
import { useHistory } from 'react-router-dom';
import { InfoIcon, LoadingIcon } from 'src/components/Icons';
import { route as routeWallet } from 'src/module/Wallet';
import { actionRemoveTooltip, actionShowTooltip } from 'src/module/Tooltip';
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
            </div>
            <Balance tokenId={tokenId} classNameTextCustom="balance-token" />
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

const InfoId = 'Info';
const Detail = React.memo((props: IMergedProps & any) => {
    const { handleOnEndReached }: IMergedProps = props;
    const translate: ITokenLanguage = useSelector(translateByFieldSelector)('token');
    const token = useSelector(selectedPrivacySelector);
    const theme = useSelector(themeSelector);
    const { isFetching, isFetched } = useSelector(historySelector);
    const histories = useSelector(combineHistorySelector);
    const { isFetching: isLoadingReceive, refreshing: isRefreshingReceive } = useSelector(receiveHistoryDataSelector);
    const history = useHistory();
    const dispatch = useDispatch();
    const infoIconRef: any = React.useRef({});
    const onShowTooltip = () => {
        dispatch(
            actionShowTooltip({
                id: InfoId,
                text: translate.toolTip.coinInfo,
                ref: infoIconRef ? infoIconRef.current : null,
                timeout: 0,
            }),
        );
    };
    const onRemoveTooltip = () => dispatch(actionRemoveTooltip('Info'));
    return (
        <Styled theme={theme}>
            <Header
                onGoBack={() => history.push(routeWallet)}
                title={token.name}
                customHeader={
                    <InfoIcon
                        ref={infoIconRef}
                        onMouseOver={onShowTooltip}
                        onMouseOut={onRemoveTooltip}
                        onClick={() => {
                            onRemoveTooltip();
                            history.push(routeTokenInfo);
                        }}
                    />
                }
            />
            <TokenBalance />
            <GroupButton />
            <HistoryList
                loading={!isFetched && isFetching}
                handleOnEndReached={handleOnEndReached}
                histories={histories}
                renderFooter={!isRefreshingReceive && isLoadingReceive && <LoadingIcon />}
            />
        </Styled>
    );
});

export default withDetail(Detail);
