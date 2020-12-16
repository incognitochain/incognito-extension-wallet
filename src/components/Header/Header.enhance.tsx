import React from 'react';
import { compose } from 'recompose';
import { useHistory } from 'react-router-dom';
import SearchBox from './Header.searchBox';

export interface TInner {
  handleClick: () => void;
  renderHeaderTitle: () => void;
}

export interface IProps {
  title: string;
  onGoBack?: () => void;
  rightHeader?: React.FunctionComponent;
  selectAccount?: boolean;
  canSearch?: boolean;
}

export interface IMergeProps extends TInner, IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (
  props: IProps & any
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
      <p
        onClick={onHandleToggleSearch}
        className='header-title fw-medium fs-medium '
      >
        {title}
      </p>
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

export default compose<IMergeProps, any>(enhance);
