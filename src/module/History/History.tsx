import React from 'react';
import { Header, LoadingIcon } from 'src/components';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Configs/Configs.selector';
import HistoryItem from 'src/module/History/features/HistoryItem';
import TrashBin from 'src/components/Icons/TrashBin';
import RefreshComponent from 'src/components/Refresh';
import withHistory, { IMergeProps } from './History.enhance';

const Styled = styled.div`
    .history-tx-item .hook span.desc-amount {
        max-width: 190px;
    }
    .shield-address {
        margin-top: 50px;
        > p {
            text-align: center;
        }
        .qrcode-container {
            margin: 30px 0;
        }
    }
    .remove-history-container .trash-bin-icon {
        width: 20px;
        height: 19px;
    }
`;

const RightHeader = React.memo((props: IMergeProps & any) => {
    const {
        handleRemoveTxHistory,
        removingBridgeTx,
        canRemoveExpiredOrPendingShield,
        handleRefreshHistory,
        refreshing,
    } = props;
    return (
        <div className="history-right-header flex">
            <RefreshComponent handleRefresh={handleRefreshHistory} refreshing={refreshing} />
            <div className="remove-history-container">
                {canRemoveExpiredOrPendingShield ? (
                    removingBridgeTx ? (
                        <LoadingIcon />
                    ) : (
                        <TrashBin onClick={handleRemoveTxHistory} />
                    )
                ) : null}
            </div>
        </div>
    );
});

const History = React.memo((props: IMergeProps & any) => {
    const { historyFactories, historyLanguage }: IMergeProps = props;
    const theme = useSelector(themeSelector);
    return (
        <Styled theme={theme}>
            <Header title={historyLanguage.headerTitle} rightHeader={<RightHeader {...props} />} />
            <div className="scroll-view">
                {historyFactories.map((item, index) => (
                    <HistoryItem key={item?.title || index} {...item} />
                ))}
            </div>
        </Styled>
    );
});

export default withHistory(React.memo(History));
