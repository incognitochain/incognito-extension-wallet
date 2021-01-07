import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { Header } from 'src/components';
import { withLayout } from 'src/components/Layout';
import { getHistoryCacheByTxIdSelector } from 'src/module/History';
import HistoryItem, { IHistoryItem } from 'src/module/History/features/HistoryItem';
import { serverSelector } from 'src/module/Preload';
import { translateByFieldSelector } from 'src/module/Configs';
import { IConfirmTxLanguage } from 'src/i18n';
import { route as routeDetail } from 'src/module/Token/features/Detail';

const Styled = styled.div`
    p.confirm-title {
        text-align: center;
        margin-bottom: 30px;
    }
`;

const ConfirmTx = () => {
    const { state }: { state: any } = useLocation();
    const history = useHistory();
    const { txId }: { txId: string } = state;
    const server = useSelector(serverSelector);
    const confirmLanguage: IConfirmTxLanguage = useSelector(translateByFieldSelector)('send.confirm');
    const tx: any = useSelector(getHistoryCacheByTxIdSelector)(txId);
    if (!tx || !confirmLanguage) {
        return <Redirect to="/" />;
    }
    const itemsFactories: IHistoryItem[] = [
        {
            title: confirmLanguage.txId,
            desc: txId,
            copyData: tx.txId,
            link: `${server.exploreChainURL}/tx/${tx.txId}`,
        },
        {
            title: confirmLanguage.toAddress,
            desc: tx.paymentAddress,
            copyData: tx.paymentAddress,
        },
        {
            title: confirmLanguage.time,
            desc: tx.timeFormated,
        },
        {
            title: confirmLanguage.amount,
            desc: `${tx.amountFormatedNoClip} ${tx.symbol}`,
        },
        {
            title: confirmLanguage.fee,
            desc: `${tx.feeFormated} ${tx.feeSymbol}`,
        },
    ];
    return (
        <Styled>
            <Header onGoBack={() => history.push(routeDetail)} title={confirmLanguage.headerTitle} />
            <p className="confirm-title fw-bold fs-supermedium center-text">{confirmLanguage.sent}</p>
            {itemsFactories.map((item: IHistoryItem) => (
                <HistoryItem key={item.title} {...item} />
            ))}
        </Styled>
    );
};

export default withLayout(React.memo(ConfirmTx));
