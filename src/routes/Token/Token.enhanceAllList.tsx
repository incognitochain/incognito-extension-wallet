import React from 'react';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { useSelector } from 'react-redux';
import { availableTokensSelector } from './Token.selector';
import { useSearchBox } from 'src/components/Header';
import { handleFilterTokenByKeySearch } from './Token.utils';
import PropTypes from 'prop-types';

interface IProps {
  availableTokens: any[];
}

const enhance = (WrappedComp: any) => (props: IProps) => {
  const [toggleUnVerified, onToggleUnVerifiedTokens] = React.useState(false);
  const availableTokens =
    props?.availableTokens || useSelector(availableTokensSelector);
  let verifiedTokens: any[] = [];
  let unVerifiedTokens: any[] = [];
  availableTokens.map((token) =>
    token?.isVerified
      ? verifiedTokens.push(token)
      : unVerifiedTokens.push(token)
  );
  const {
    result: _verifiedTokens,
    keySearch,
    handleFilter: handleFilterData,
  } = useSearchBox({
    data: verifiedTokens,
    handleFilter: () =>
      handleFilterTokenByKeySearch({ tokens: verifiedTokens, keySearch }),
  });
  const {
    result: _unVerifiedTokens,
    keySearch: _keySearch,
    handleFilter: _handleFilterData,
  } = useSearchBox({
    data: unVerifiedTokens,
    handleFilter: () =>
      handleFilterTokenByKeySearch({
        tokens: unVerifiedTokens,
        keySearch: _keySearch,
      }),
  });

  React.useEffect(() => {
    handleFilterTokenByKeySearch({
      tokens: verifiedTokens,
      keySearch,
    });
    handleFilterData();
    if (toggleUnVerified) {
      handleFilterTokenByKeySearch({
        tokens: unVerifiedTokens,
        keySearch: _keySearch,
      });
      _handleFilterData();
    }
  }, [availableTokens]);

  const tokensFactories = [
    {
      data: _verifiedTokens,
      visible: true,
    },
    {
      data: _unVerifiedTokens,
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

enhance.propTypes = {
  availableTokens: PropTypes.array.isRequired,
};

export default enhance;
