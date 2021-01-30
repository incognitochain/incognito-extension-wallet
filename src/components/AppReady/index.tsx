import React from 'react';
import styled from 'styled-components';
import { AppIcon } from 'src/components/Icons';
import { translateByFieldSelector } from 'src/module/Configs';
import { IGeneralLanguage } from 'src/i18n';
import { useSelector } from 'react-redux';

const Styled = styled.div``;
interface IProps {
    title?: string;
    desc: string;
}

const AppReady = (props: IProps) => {
    const translate: IGeneralLanguage = useSelector(translateByFieldSelector)('general');
    const { title, desc } = props;
    return (
        <Styled>
            <AppIcon />
            <div className="fw-bold fs-medium main-text">{title || translate.readyDesc}</div>
            <div className="fs-regular sub-text m-t-15">{desc}</div>
        </Styled>
    );
};

export default React.memo(AppReady);
