import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from 'src/components';
import { withLayout } from 'src/components/Layout';
import HistoryItem, { IHistoryItem } from 'src/module/History/features/HistoryItem';
import { translateByFieldSelector } from 'src/module/Configs';
import { IConfirmTxLanguage } from 'src/i18n';
import { serverSelector } from 'src/module/Preload';
import { route as routeDetail } from 'src/module/Token/features/Detail';
import { selectedTokenIdSelector } from 'src/module/Token';
import { BtnAction } from 'src/module/AddressBook/features/Action';
import { ConfirmTxItem } from './ConfirmTx.interface';

const Styled = styled.div`
    p.confirm-title {
        text-align: center;
        margin-bottom: 30px;
    }
`;

const ConfirmTx = () => {
    const { state }: { state: any } = useLocation();
    const historyState = useHistory();
    const { confirmTx }: { confirmTx: ConfirmTxItem } = state;
    const confirmLanguage: IConfirmTxLanguage = useSelector(translateByFieldSelector)('send.confirm');
    const server = useSelector(serverSelector);
    const selectedPrivacyTokenId = useSelector(selectedTokenIdSelector);
    if (!confirmTx) {
        return <Redirect to="/" />;
    }
    const itemsFactories: IHistoryItem[] = [
        {
            title: confirmLanguage.txId,
            desc: confirmTx.txId,
            copyData: confirmTx.txId,
            link: `${server.exploreChainURL}/tx/${confirmTx.txId}`,
        },
        {
            title: confirmLanguage.toAddress,
            desc: confirmTx.paymentAddress,
            copyData: confirmTx.paymentAddress,
        },
        {
            title: confirmLanguage.time,
            desc: confirmTx.time,
        },
        {
            title: confirmLanguage.amount,
            desc: `${confirmTx.amount} ${confirmTx.symbol}`,
        },
        {
            title: confirmLanguage.fee,
            desc: `${confirmTx.fee} ${confirmTx.feeSymbol}`,
        },
    ];
    return (
        <Styled>
            <Header onGoBack={() => historyState.push(`${routeDetail}/${selectedPrivacyTokenId}`)} title=" " />
            <p className="confirm-title fw-medium fs-avglarge center-text">{confirmLanguage.sent}</p>
            {itemsFactories.map((item: IHistoryItem) => (
                <HistoryItem key={item.title} {...item} />
            ))}
            <BtnAction data={confirmTx} />
        </Styled>
    );
};

export default withLayout(React.memo(ConfirmTx));
