import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Header, InfoIcon } from 'src/components';
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
import { route as routeShield } from 'src/module/Shield';
import { route as routeWhyShield } from 'src/module/Shield/features/WhyShield';
import withWallet from './Wallet.enhance';
import { Styled } from './Wallet.styled';

const ListFollowToken = React.memo(() => {
    const listFollowTokenIds = useSelector(followedTokensIdsSelector)(false);
    const history = useHistory();
    const dispatch = useDispatch();
    const handleSelectToken = async (tokenId: string) => {
        await dispatch(actionSetSelectedToken(tokenId));
        history.push(`/token/${tokenId}`);
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
    const history = useHistory();
    return (
        <div className="total-shield">
            <p className="fs-avglarge fw-medium center-text">{`$${totalShield.formatTotalAmountUSD}`}</p>
            <div className="total-shield-sub flex">
                <p className="sub-text center-text">{translate.wallet.blockShield.totalShielded}</p>
                <InfoIcon isGreyIcon onClick={() => history.push(routeWhyShield)} />
            </div>
            <Button title={btnShield} onClick={() => history.push(routeShield)} />
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

const Wallet = React.memo(() => {
    return (
        <Styled>
            <Header />
            <TotalShield />
            <ListFollowToken />
            <AddCoin />
        </Styled>
    );
});

export default withWallet(Wallet);
