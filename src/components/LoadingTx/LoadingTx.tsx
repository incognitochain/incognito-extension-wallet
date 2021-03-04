import React from 'react';
import { useSelector } from 'react-redux';
import { IGeneralLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import styled from 'styled-components';
import { LoadingIcon } from 'src/components/Icons';
import { IGlobalStyle } from 'src/styles';

const Styled = styled.div`
    position: relative;
    height: 200px;
    background: ${(props: IGlobalStyle) => props.theme.modalBg};
    width: 100%;
    border-radius: 10px;
    padding: 25px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
    }
    .loading-icon {
        margin-bottom: 15px;
    }
`;

const LoadingTx = () => {
    const translate: IGeneralLanguage = useSelector(translateByFieldSelector)('general');
    return (
        <Styled>
            <LoadingIcon />
            <p
                className="sub-text center-text title"
                dangerouslySetInnerHTML={{
                    __html: translate.loadingTx,
                }}
            />
        </Styled>
    );
};

export default React.memo(LoadingTx);
