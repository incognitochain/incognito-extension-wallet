import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import { IShieldLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import styled from 'styled-components';

const Styled = styled.div`
    .sub-text {
        margin-bottom: 30px;
    }
    .main-text {
        margin-bottom: 10px;
    }
`;

const WhyShield = () => {
    const translate: IShieldLanguage = useSelector(translateByFieldSelector)('shield');
    return (
        <Styled>
            <Header title={translate.whyShield.headerTitle} />
            <div className="content" dangerouslySetInnerHTML={{ __html: translate.whyShield.content }} />
        </Styled>
    );
};

export default React.memo(WhyShield);
