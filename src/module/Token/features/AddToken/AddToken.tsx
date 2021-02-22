import React from 'react';
import { useSelector } from 'react-redux';
import { Header } from 'src/components';
import { ILanguage, ITokenLanguage } from 'src/i18n';
import { translateByFieldSelector, translateSelector } from 'src/module/Configs';
import styled from 'styled-components';
import { ListAllToken, TokenBasic, IAllListTokenInner } from 'src/module/Token';
import AddCircle from 'src/components/Icons/AddCircle';
import { useHistory } from 'react-router-dom';
import { route as routeAddManually } from 'src/module/Token/features/AddManually';
import withAddToken, { TInner } from './AddToken.enhance';

const Styled = styled.div`
    position: relative;
    height: 535px;
    .scroll-view {
        max-height: 450px;
    }
    .add-manually {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        justify-content: space-between;
    }
`;

const AddManually = React.memo(() => {
    const translate: ITokenLanguage = useSelector(translateByFieldSelector)('token');
    const history = useHistory();
    return (
        <div className="add-manually flex">
            <p className="fs-medium fw-medium">{translate.addManually.btnAddManually}</p>
            <AddCircle onClick={() => history.push(routeAddManually)} />
        </div>
    );
});

const AddToken = (props: TInner & IAllListTokenInner & any) => {
    const translate: ILanguage = useSelector(translateSelector);
    const addTokenTranslate = translate.token.addToken;
    const { handleToggleFollowTokenById } = props;
    const renderItem = (tokenId: string) => {
        return (
            <TokenBasic tokenId={tokenId} handleSelectToken={() => handleToggleFollowTokenById(tokenId)} showFollowed />
        );
    };
    return (
        <Styled>
            <Header title={addTokenTranslate.headerTitle} canSearch />
            <ListAllToken {...{ ...props, renderItem }} />
            <AddManually />
        </Styled>
    );
};

export default withAddToken(AddToken);
