import React from 'react';
import { Header, LoadingIcon } from 'src/components';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Configs/Configs.selector';
import HistoryItem from 'src/module/History/features/HistoryItem';
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
    .history-tx-item .shield-hook {
        justify-content: unset;
    }
    .history-tx-item .hook .btn-sub-shield {
        width: unset;
        margin: 0 5px;
        padding: 0 5px;
        height: 20px;
        line-height: 20px;
        border-radius: 4px;
    }
    .scroll-view {
        max-height: 465px;
    }
`;

const History = React.memo((props: IMergeProps & any) => {
    const { historyFactories, historyLanguage, historyData }: IMergeProps = props;
    const theme = useSelector(themeSelector);
    return (
        <Styled theme={theme}>
            <Header title={historyLanguage.headerTitle} />
            {!historyData || (historyFactories.length === 0 && <LoadingIcon center />)}
            <div className="scroll-view">
                {historyFactories.map((item, index) => (
                    <HistoryItem key={item?.title || index} {...item} />
                ))}
            </div>
        </Styled>
    );
});

export default withHistory(History);
