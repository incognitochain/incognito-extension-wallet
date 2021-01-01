import React from 'react';
import { Name, Amount, Followed, Symbol } from './Token';
import { TokenStyled as Styled } from './Token.styled';
import withToken, { IMergePropsToken } from './Token.enhance';

const TokenBasic = (props: IMergePropsToken) => {
    const { tokenId, handleOnClick, showAmount, showFollowed } = props;
    return (
        <Styled to="#" className="token-container token-basic" onClick={handleOnClick}>
            <div className="extra">
                <Name classNameCustom="extra-item" tokenId={tokenId} />
                {showAmount && <Amount classNameCustom="extra-item" tokenId={tokenId} />}
                {showFollowed && <Followed tokenId={tokenId} />}
            </div>
            <div className="extra extra-bottom">
                <Symbol tokenId={tokenId} />
            </div>
        </Styled>
    );
};

export default withToken(TokenBasic);
