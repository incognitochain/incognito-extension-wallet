import React from 'react';
import Header from 'src/components/Header';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectedPrivacySelector } from 'src/module/Token';
import { actionToggleModal } from 'src/components/Modal';

const Styled = styled.div``;

const NormalText = React.memo(({ text, sub }: { text: string; sub?: string }) => (
    <p className="sub-text" style={{ marginBottom: '30px' }}>
        {text}
        {sub && (
            <span
                className="main-text"
                onClick={() =>
                    window.open(
                        'https://incognito.org/t/verified-badges-for-custom-privacy-coins-on-incognito-chain/952',
                    )
                }
            >
                {sub}
            </span>
        )}
    </p>
));

const CoinInfoVerified = React.memo(() => {
    return (
        <div>
            <NormalText text="Genuine coins that originate from an external blockchain (Ethereum, Bitcoin, Binance, etc.) are automatically verified." />
            <NormalText text="For user-created coins, the verified tick certifies that this coin is associated with a particular project and is not a duplicate." />
        </div>
    );
});

const CoinInfoUnVerified = React.memo(() => {
    return (
        <div>
            <NormalText text="If you are shielding a coin or adding it to your list, look out for the verified symbol to make sure you have the correct coin you are looking for." />
            <NormalText text="On certain blockchains, anyone can create duplicates with the same name and symbol. If an ERC20 or BEP2 coin does not have a verified tick, it is likely to be a copy." />
            <NormalText
                text="If an Incognito coin does not have a verified tick, its creators have not yet gone through the process of "
                sub="verifying their coin."
            />
        </div>
    );
});

const CoinInfoVerify = React.memo(() => {
    const { isVerified } = useSelector(selectedPrivacySelector);
    const dispatch = useDispatch();
    return (
        <Styled>
            <Header
                onGoBack={() =>
                    dispatch(
                        actionToggleModal({
                            visible: false,
                            data: null,
                        }),
                    )
                }
                title={isVerified ? 'What is a verified coin?' : 'What is an unverified coin?'}
            />
            {isVerified ? <CoinInfoVerified /> : <CoinInfoUnVerified />}
        </Styled>
    );
});

export default React.memo(CoinInfoVerify);
