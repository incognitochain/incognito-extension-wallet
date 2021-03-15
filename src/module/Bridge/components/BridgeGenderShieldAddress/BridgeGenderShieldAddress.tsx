import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import { IGeneralLanguage, IShieldLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import { Button, ClockWiseIcon, LoadingIcon } from 'src/components';
import withGenShieldAddress, {
    IMergedProps,
} from 'src/module/Bridge/components/BridgeGenderShieldAddress/BridgeGenderShieldAddress.enhance';
import { ISelectedPrivacy, selectedPrivacySelector } from 'src/module/Token';
import { shieldSelector } from 'src/module/Shield';
import { useCountDown } from 'src/utils/useHooks';
import QrCode from 'src/components/QrCode';
import { Styled } from 'src/module/Bridge/components/BridgeGenderShieldAddress';

const ShieldError = (props: { handleGenShieldAddr: () => any }) => {
    const translate: IShieldLanguage = useSelector(translateByFieldSelector)('shield');
    const tsgeneral: IGeneralLanguage = useSelector(translateByFieldSelector)('general');
    const { error1, error2 } = translate.genShieldAddress;
    const { handleGenShieldAddr } = props;
    return (
        <div className="shield-error">
            <ClockWiseIcon />
            <p className="sub-text" dangerouslySetInnerHTML={{ __html: error1 }} />
            <Button onClick={handleGenShieldAddr} title={tsgeneral.btnRetry} />
            <p className="sub-text" dangerouslySetInnerHTML={{ __html: error2 }} />
        </div>
    );
};

const GenShieldAddress = (props: IMergedProps & any) => {
    const { handleGenShieldAddr }: IMergedProps = props;
    const translate: IShieldLanguage = useSelector(translateByFieldSelector)('shield');
    const { title2, title3, title4, title5, title6 } = translate.genShieldAddress;
    const { title1 } = translate.bridgeShieldAddress;
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const { data, isFetching, isFetched } = useSelector(shieldSelector);
    const hasError = !isFetched && !isFetching;
    const { address, min } = data;
    const [remainTime] = useCountDown({ time: 7200 });
    const renderMain = () => {
        if (isFetching) {
            return <LoadingIcon center />;
        }
        if (hasError) {
            return <ShieldError handleGenShieldAddr={handleGenShieldAddr} />;
        }
        return (
            <div className="extra scroll-view">
                <p className="title fw-medium">{title1}</p>
                <QrCode
                    qrCodeProps={{
                        value: address,
                        size: 150,
                    }}
                    hook={
                        <div className="hook">
                            <p>
                                {title2} <span className="fw-bold">{remainTime}</span>
                            </p>
                            {!!min && min !== '0' && (
                                <>
                                    <p>
                                        {title3}{' '}
                                        <span className="fw-bold">{`${min} ${
                                            selectedPrivacy.symbol || selectedPrivacy.pSymbol
                                        }`}</span>
                                    </p>
                                    <p className="fw-medium fs-small sub-text">{title4}</p>
                                </>
                            )}
                        </div>
                    }
                />
                <div className="bottom">
                    <p className="sub-text" dangerouslySetInnerHTML={{ __html: title5 }} />
                    <p className="sub-text" dangerouslySetInnerHTML={{ __html: title6 }} />
                </div>
            </div>
        );
    };
    return <Styled>{renderMain()}</Styled>;
};

export default withGenShieldAddress(GenShieldAddress);
