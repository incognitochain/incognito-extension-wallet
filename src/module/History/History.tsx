import React from 'react';
import { Header } from 'src/components';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { themeSelector } from 'src/module/Configs/Configs.selector';
import HistoryItem from 'src/module/History/features/HistoryItem';
import withHistory, { IMergeProps } from './History.enhance';

const Styled = styled.div`
    .confirm-tx-item .hook span.desc-amount {
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
`;

const History = React.memo((props: IMergeProps & any) => {
    const { historyFactories, historyLanguage }: IMergeProps = props;
    const theme = useSelector(themeSelector);
    return (
        <Styled theme={theme}>
            <Header title={historyLanguage.headerTitle} />
            <div className="scroll-view">
                {historyFactories.map((item, index) => (
                    <HistoryItem key={item?.title || index} {...item} />
                ))}
            </div>
        </Styled>
    );
});

export default withHistory(React.memo(History));
