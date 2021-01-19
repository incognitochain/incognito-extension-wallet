import React from 'react';
import Header from 'src/components/Header';
import { CopyIcon, OpenLinkIcon, QuestionIcon } from 'src/components/Icons';
import { TokenBasic } from 'src/module/Token';
import { useSelector } from 'react-redux';
import { translateByFieldSelector } from 'src/module/Configs';
import { ITokenLanguage } from 'src/i18n';
import { COLORS } from 'src/styles';
import withTokenInfo, { IInfo } from './TokenInfo.enhance';
import { Styled } from './TokenInfo.styled';

const InfoItem = ({ label, value, copyable, link }: IInfo) => {
    if (!value) {
        return null;
    }
    return (
        <div className="info-item flex">
            {!!label && <p className="ellipsis sub-text">{label}</p>}
            <div className="hook flex">
                {!!value && <p className="ellipsis fw-medium main-text">{value}</p>}
                {copyable && <CopyIcon />}
                {!!link && <OpenLinkIcon onClick={() => window.open(link)} />}
            </div>
        </div>
    );
};

const TokenInfo = (
    props: {
        infosFactories: IInfo[];
        tokenId: string;
        isVerified: boolean;
        handlePressVerifiedInfo: () => any;
    } & any,
) => {
    const translate: ITokenLanguage = useSelector(translateByFieldSelector)('token');
    const { infosFactories, tokenId, isVerified, handlePressVerifiedInfo } = props;
    return (
        <Styled>
            <Header title={translate.infoToken.headerTitle} />
            <div className="extra">
                <TokenBasic tokenId={tokenId} />
                <div className="flex verified-container">
                    <p className="ellipsis subtext" style={{ color: isVerified ? COLORS.green : COLORS.colorGreyBold }}>
                        {isVerified ? 'Verified' : 'Unverified'}
                    </p>
                    <QuestionIcon onClick={handlePressVerifiedInfo} />
                </div>
                {infosFactories.map((info: IInfo) => (
                    <InfoItem {...info} key={info.label} />
                ))}
            </div>
        </Styled>
    );
};

export default withTokenInfo(TokenInfo);
