import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useSelector } from 'react-redux';
import { availableTokensSelector } from './Token.selector';
import { useSearchBox } from 'src/components/Header';
import { handleFilterTokenByKeySearch } from './Token.utils';
import { keySearchSelector } from 'src/components/Header/Header.selector';
import { IAllListTokenInner, ISelectedPrivacy } from './Token.interface';
interface IProps {
  availableTokens?: ISelectedPrivacy[];
}
const enhance = (WrappedComp: React.FunctionComponent) => (
  props: IProps & IAllListTokenInner & any
) => {
  const [toggleUnVerified, onToggleUnVerifiedTokens] = React.useState(false);
  const availableTokens =
    props?.availableTokens || useSelector(availableTokensSelector);
  let verifiedTokens: ISelectedPrivacy[] = [];
  let unVerifiedTokens: ISelectedPrivacy[] = [];
  const keySearch = useSelector(keySearchSelector);
  availableTokens.map((token: ISelectedPrivacy) =>
    token?.isVerified
      ? verifiedTokens.push(token)
      : unVerifiedTokens.push(token)
  );
  const { result: _verifiedTokens } = useSearchBox({
    data: verifiedTokens,
    handleFilter: () =>
      handleFilterTokenByKeySearch({ tokens: verifiedTokens, keySearch }),
  });
  const { result: _unVerifiedTokens } = useSearchBox({
    data: unVerifiedTokens,
    handleFilter: () =>
      handleFilterTokenByKeySearch({
        tokens: unVerifiedTokens,
        keySearch,
      }),
  });

  const tokensFactories = [
    {
      data: _verifiedTokens.map((token: ISelectedPrivacy) => token.tokenId),
      visible: true,
    },
    {
      data: _unVerifiedTokens.map((token: ISelectedPrivacy) => token.tokenId),
      visible: toggleUnVerified,
    },
  ];

  React.useEffect(() => {
    if (toggleUnVerified && !keySearch) {
      onToggleUnVerifiedTokens(!toggleUnVerified);
    }
  }, [keySearch]);
  return (
    <ErrorBoundary>
      <WrappedComp
        {...{
          ...props,
          tokensFactories,
          toggleUnVerified,
          onToggleUnVerifiedTokens,
        }}
      />
    </ErrorBoundary>
  );
};

export default enhance;
