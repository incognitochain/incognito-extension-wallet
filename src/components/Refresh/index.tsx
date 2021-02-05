import React from 'react';
import { LoadingIcon, RefreshIcon } from 'src/components/Icons';

interface IProps {
    handleRefresh: () => any;
    refreshing: boolean;
}

const RefreshComponent = React.forwardRef((props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>, ref: any) => {
    const { handleRefresh, refreshing }: IProps = props;
    return (
        <div className="refresh-container">
            {refreshing ? (
                <LoadingIcon />
            ) : (
                <RefreshIcon ref={ref} className="refresh-icon" onClick={handleRefresh} {...props} />
            )}
        </div>
    );
});

export default React.memo(RefreshComponent);
