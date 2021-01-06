import { AccountInstance } from 'incognito-js/build/web/browser';
import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { toNumber } from 'lodash';
import { IAccountLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import styled from 'styled-components';
import Item from './Detail';

interface IProps {
    account: AccountInstance;
}

const Styled = styled.div``;

const AccountDetails = (props: IProps) => {
    const translate: IAccountLanguage = useSelector(translateByFieldSelector)('account');
    const translateAccountDetail = translate.accountDetail;
    const { account } = props;
    const {
        paymentAddressKeySerialized,
        privateKeySerialized,
        publicKeyCheckEncode,
        validatorKey,
        viewingKeySerialized,
        paymentAddress,
    } = account.key.keySet;

    const shard = useMemo(() => {
        const { publicKeyBytes } = paymentAddress;
        const lastByte = publicKeyBytes[publicKeyBytes.length - 1];

        return (toNumber(lastByte) % 8).toString();
    }, [paymentAddress]);

    const index = useMemo(() => {
        return account.getIndex();
    }, [account]);

    const renderItem = useCallback(() => {
        return [
            <Item
                {...{
                    title: translateAccountDetail.title1,
                    desc: paymentAddressKeySerialized,
                }}
                key={translateAccountDetail.title1}
            />,
            <Item
                {...{
                    title: translateAccountDetail.title2,
                    desc: privateKeySerialized,
                }}
                key={translateAccountDetail.title2}
            />,
            <Item
                {...{
                    title: translateAccountDetail.title3,
                    desc: publicKeyCheckEncode,
                }}
                key={translateAccountDetail.title3}
            />,
            <Item
                {...{ title: translateAccountDetail.title4, desc: viewingKeySerialized }}
                key={translateAccountDetail.title4}
            />,
            <Item
                {...{ title: translateAccountDetail.title5, desc: validatorKey }}
                key={translateAccountDetail.title5}
            />,
            <Item {...{ title: translateAccountDetail.index, desc: index }} key={translateAccountDetail.index} />,
            <Item {...{ title: translateAccountDetail.shard, desc: shard }} key={translateAccountDetail.shard} />,
        ];
    }, []);

    return <Styled className="scroll-view">{renderItem()}</Styled>;
};

export default AccountDetails;
