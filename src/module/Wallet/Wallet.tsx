import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button } from 'src/components';
import { ILanguage } from 'src/i18n';
import styled from 'styled-components';
import {
    ListToken,
    Token,
    followedTokensIdsSelector,
    actionSetSelectedToken,
    totalShieldedTokensSelector,
    ITotalShielded,
} from 'src/module/Token';
import { route as routeAddToken } from 'src/module/Token/features/AddToken';
import { translateSelector } from '../Configs';
import withWallet from './Wallet.enhance';

const Styled = styled.div`
    position: relative;
    height: 485px;
    .list-token {
        height: 300px;
        overflow: scroll;
    }
    .list-token .token-container {
        :last-child {
            margin-bottom: 0;
        }
    }
    .total-shield {
        > p {
            :nth-child(2) {
                margin-top: 15px;
            }
        }
        .btn-container {
            margin: 30px 0;
            width: 100%;
        }
    }
    .btn-add-coin {
        position: absolute;
        bottom: 0;
        left: 0;
    }
`;

const ListFollowToken = React.memo(() => {
    const listFollowTokenIds = useSelector(followedTokensIdsSelector)(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleSelectToken = (tokenId: string) => {
        dispatch(actionSetSelectedToken(tokenId));
        history.push('/token');
    };
    const renderItem = (tokenId: string) => (
        <Token tokenId={tokenId} handleSelectToken={() => handleSelectToken(tokenId)} showBalance showAmount />
    );
    return <ListToken data={listFollowTokenIds} renderItem={renderItem} />;
});

const TotalShield = React.memo(() => {
    const totalShield: ITotalShielded = useSelector(totalShieldedTokensSelector);
    const translate: ILanguage = useSelector(translateSelector);
    const { btnShield } = translate.wallet.blockShield;
    return (
        <div className="total-shield">
            <p className="fs-avglarge fw-medium center-text">{`$${totalShield.formatTotalAmountUSD}`}</p>
            <Button title={btnShield} />
        </div>
    );
});

const AddCoin = React.memo(() => {
    const translate: ILanguage = useSelector(translateSelector);
    const { wallet } = translate;
    return (
        <Link className="btn-add-coin fw-medium" to={routeAddToken}>
            {wallet.addCoin}
        </Link>
    );
});

const Wallet = () => {
    return (
        <Styled>
            <TotalShield />
            <ListFollowToken />
            <AddCoin />
        </Styled>
    );
};

export default withWallet(React.memo(Wallet));
