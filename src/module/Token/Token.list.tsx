import React from 'react';

interface IProps {
    data: any[];
    visible?: boolean;
    renderItem: (tokenId: string) => any;
}

const ListToken = (props: IProps) => {
    const { data, visible = true, renderItem } = props;
    if (!visible || data.length === 0) {
        return null;
    }
    return (
        <div className="list-token">
            {data.map((tokenId: string) => (
                <React.Fragment key={tokenId}>{renderItem(tokenId)}</React.Fragment>
            ))}
        </div>
    );
};

export default React.memo(ListToken);
