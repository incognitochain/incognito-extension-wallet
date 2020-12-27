import React, { HTMLAttributes } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { delay } from 'src/utils';
import { actionSetRefreshPage } from './Header.actions';
import SearchBox from './Header.searchBox';

export interface TInner {
    handleClick: () => void;
    renderHeaderTitle: () => void;
    onHandleRefreshPage: () => any;
}

export interface IProps {
    title?: string;
    onGoBack?: () => void;
    rightHeader?: React.FunctionComponent;
    selectAccount?: boolean;
    canSearch?: boolean;
    customHeader?: React.FunctionComponent | React.ReactElement;
    refreshPage?: boolean;
    handleRefreshPage?: () => any;
}

export interface IMergeProps extends TInner, IProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & HTMLAttributes<HTMLElement>) => {
    const dispatch = useDispatch();
    const { canSearch = false, onGoBack, title, customHeader, handleRefreshPage } = props;
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
        return null;
    };
    const renderHeaderTitle = () => {
        if (toggleSearch) {
            return <SearchBox title={title} />;
        }
        return (
            <div className="header-container flex">
                {title && (
                    <button
                        type="button"
                        onClick={onHandleToggleSearch}
                        className="header-title fw-medium fs-medium ellipsis"
                    >
                        {title}
                    </button>
                )}
                {customHeader && customHeader}
            </div>
        );
    };
    const onHandleRefreshPage = async () => {
        if (typeof handleRefreshPage === 'function') {
            try {
                await dispatch(actionSetRefreshPage(true));
                await Promise.all([handleRefreshPage(), delay()]);
            } catch (error) {
                throw error;
            } finally {
                dispatch(actionSetRefreshPage(false));
            }
        }
    };
    return (
        <WrappedComponent
            {...{
                ...props,
                toggleSearch,
                renderHeaderTitle,
                handleClick,
                title,
                onHandleRefreshPage,
            }}
        />
    );
};

export default enhance;
