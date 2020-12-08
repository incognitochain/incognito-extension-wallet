import React, { SyntheticEvent } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { historyLocalSelector } from './History.selector';
import withHistory from './History.enhance';
import { TxHistoryModel } from 'incognito-js/build/web/browser';
import { Link, useHistory } from 'react-router-dom';
import { IHistory } from './History.interface';

interface IProps {}

interface IHistoryItem {
  history: IHistory & TxHistoryModel;
}

const Styled = styled.div`
  max-height: 300px;
  overflow: scroll;
  margin-top: 30px;
  .history-item {
    margin-bottom: 30px;
    :last-child {
      margin-bottom: unset;
    }
  }
  .history-item .hook {
    display: flex;
    justify-content: space-between;
    align-items: center;
    :first-child {
      margin-bottom: 15px;
    }
  }
`;

const HistoryItem = React.memo((props: IHistoryItem) => {
  const { history } = props;
  const historyRouter = useHistory();
  const handleClick = (e: SyntheticEvent) => {
    e.preventDefault();
    historyRouter.push('/history', {
      history,
    });
  };
  return (
    <Link to='#' onClick={handleClick} className='history-item'>
      <div className='hook'>
        <p className='bold-text'>{history.type}</p>
        <p className='bold-text'>{history.amountFormated}</p>
      </div>
      <div className='hook'>
        <p className='medium-text'>{history.timeFormated}</p>
        <p className='medium-text'>{history.status}</p>
      </div>
    </Link>
  );
});

const History = (props: IProps) => {
  const histories = useSelector(historyLocalSelector);
  return (
    <Styled>
      {histories.map((history: TxHistoryModel & IHistory & any) => (
        <HistoryItem key={history.txId} history={history} />
      ))}
    </Styled>
  );
};

export default withHistory(History);
