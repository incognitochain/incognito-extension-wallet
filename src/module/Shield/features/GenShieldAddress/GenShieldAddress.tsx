import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Header } from 'src/components';
import QrCode from 'src/components/QrCode';
import { IGeneralLanguage, IShieldLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import { ISelectedPrivacy, selectedPrivacySelector } from 'src/module/Token';
import { shieldSelector } from 'src/module/Shield/Shield.selector';
import { useCountDown } from 'src/utils/useHooks';
import { ClockWiseIcon, InfoIcon, LoadingIcon } from 'src/components/Icons';
import { actionShowTooltip } from 'src/module/Tooltip';
import withGenShieldAddress, { IMergedProps } from './GenShieldAddress.enhance';
import { Styled } from './GenShieldAddress.styled';

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
    const { headerTitle, title1, title2, title3, title4, title5, title6 } = translate.genShieldAddress;
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const { data, isFetching, isFetched } = useSelector(shieldSelector);
    const infoIconRef: any = React.useRef({});
    const hasError = !isFetched && !isFetching;
    const dispatch = useDispatch();
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
                <p
                    dangerouslySetInnerHTML={{
                        __html: title1,
                    }}
                />
                <QrCode
                    qrCodeProps={{
                        value: address,
                        size: 175,
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
    const handleShowTooltip = () =>
        dispatch(
            actionShowTooltip({
                text: (
                    <p className="fs-small" style={{ width: '230px' }}>
                        {translate.genShieldAddress.tooltip}
                    </p>
                ),
                ref: infoIconRef ? infoIconRef.current : null,
            }),
        );
    React.useEffect(() => {
        handleShowTooltip();
    }, []);
    return (
        <Styled>
            <Header
                title={`${headerTitle} ${selectedPrivacy.symbol || selectedPrivacy.pSymbol}`}
                customHeader={<InfoIcon ref={infoIconRef} onClick={handleShowTooltip} />}
            />
            {renderMain()}
        </Styled>
    );
};

export default withGenShieldAddress(GenShieldAddress);
