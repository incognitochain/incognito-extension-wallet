import React from 'react';
import { useSelector } from 'react-redux';
import { ILanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateSelector } from 'src/module/Configs';
import { AppIcon, Button, Layout } from 'src/components';

interface IProps {
    onGetStarted: () => any;
}

const Styled = styled.div`
    .subtitle {
        margin-top: 15px;
        margin-bottom: 30px;
    }
`;

const GetStarted = (props: IProps) => {
    const { onGetStarted } = props;
    const translate: ILanguage = useSelector(translateSelector);
    const dictionary = translate.welcome.newUser;
    return (
        <Layout header="">
            <Styled>
                <AppIcon />
                <div className="fs-medium fw-bold">{dictionary.getStartedTitle}</div>
                <div className="sub-text subtitle">{dictionary.getStartedDesc}</div>
                <Button onClick={onGetStarted} title={dictionary.getStartedBtn} />
            </Styled>
        </Layout>
    );
};

export default React.memo(GetStarted);
