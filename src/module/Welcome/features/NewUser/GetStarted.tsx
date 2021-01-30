import React from 'react';
import { useSelector } from 'react-redux';
import { ILanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateSelector } from 'src/module/Configs';
import { AppIcon, Button, Layout } from 'src/components';
import { CONSTANT_COLORS } from 'src/constants';

interface IProps {
    onGetStarted: () => void;
}

const Styled = styled.div`
    .title {
        font-size: 18px;
        font-weight: bold;
        color: ${CONSTANT_COLORS.BLACK};
        letter-spacing: 0;
    }

    .subtitle {
        margin-top: 15px;
        margin-bottom: 30px;
        color: ${CONSTANT_COLORS.LIGHT_GREY};
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
                <div className="title">{dictionary.getStartedTitle}</div>
                <div className="subtitle">{dictionary.getStartedDesc}</div>
                <Button onClick={onGetStarted} title={dictionary.getStartedBtn} />
            </Styled>
        </Layout>
    );
};

export default GetStarted;
