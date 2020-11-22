import React from 'react';
import { compose } from 'recompose';
import { useHistory } from 'react-router-dom';
import SearchBox from './Header.searchBox';

export interface TOutter {
  handleClick: () => void;
  renderHeaderTitle: () => void;
}

export interface TInter {
  title: string;
  onGoBack?: () => void;
  rightHeader?: React.FunctionComponent;
  selectAccount?: boolean;
  canSearch?: boolean;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (
  props: TInter & any
) => {
  const { canSearch = false, onGoBack, title } = props;
  const [state, setState] = React.useState({
    toggleSearch: false,
  });
  const { toggleSearch } = state;
  const onHandleToggleSearch = async () => {
    if (canSearch) {
      await setState({
        ...state,
        toggleSearch: true,
      });
    }
  };
  const history = useHistory();
  const handleClick = () => {
    if (typeof onGoBack === 'function') {
      return onGoBack();
    }
    history.goBack();
  };
  const renderHeaderTitle = () => {
    if (toggleSearch) {
      return <SearchBox title={title} />;
    }
    return (
      <h1 onClick={onHandleToggleSearch} className='title ellipsis'>
        {title}
      </h1>
    );
  };
  return (
    <WrappedComponent
      {...{
        ...props,
        toggleSearch,
        renderHeaderTitle,
        handleClick,
      }}
    />
  );
};

export default compose<any, TInter & TOutter & any>(enhance);
