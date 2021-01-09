import React from 'react';
import { LoadingIcon, RefreshIcon } from 'src/components/Icons';

interface IProps {
    handleRefresh: () => any;
    refreshing: boolean;
}

const RefreshComponent = (props: IProps) => {
    const { handleRefresh, refreshing }: IProps = props;
    return (
        <div className="refresh-container">
            {refreshing ? <LoadingIcon /> : <RefreshIcon className="refresh-icon" onClick={handleRefresh} />}
        </div>
    );
};

export default RefreshComponent;
