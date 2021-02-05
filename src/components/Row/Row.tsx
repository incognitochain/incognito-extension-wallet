import React from 'react';
import styled from 'styled-components';

interface IProps {
    onClick?: () => void;
    children?: Array<any>;
    className?: any;
}

const Styled = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Row = (props: IProps) => {
    const { onClick, children, className } = props;

    return (
        <Styled onClick={onClick} className={className}>
            {children}
        </Styled>
    );
};

export default React.memo(Row);
