import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Header } from 'src/components';
import { ILanguage } from 'src/i18n';
import {
    ListToken,
    Token,
    followedTokensIdsSelector,
    actionSetSelectedToken,
    totalShieldedTokensSelector,
    ITotalShielded,
} from 'src/module/Token';
import { route as routeAddToken } from 'src/module/Token/features/AddToken';
import { translateSelector } from 'src/module/Configs/Configs.selector';
import withWallet from './Wallet.enhance';
import { Styled } from './Wallet.styled';

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
            <Button title={btnShield} disabled />
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

interface IProps {
    // eslint-disable-next-line no-unused-vars
    handleLoadWallet: (reload?: boolean) => any;
}

const Wallet = React.memo((props: IProps) => {
    const { handleLoadWallet } = props;
    return (
        <Styled>
            <Header refreshPage handleRefreshPage={() => handleLoadWallet(true)} />
            <TotalShield />
            <ListFollowToken />
            <AddCoin />
        </Styled>
    );
});

export default withWallet(Wallet);
