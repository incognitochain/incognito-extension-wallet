import React from 'react';
import styled from 'styled-components';

interface IProps {}

const Styled = styled.button`
    width: 18px;
    height: 10px;
`;

const ChainVector = React.memo((props: any) => {
    return (
        <svg width="17px" height="17px" viewBox="0 0 17 18">
            <path
                d="M8.137 12.602l1.195-1.211c-.922-.079-1.586-.383-2.062-.86-1.32-1.32-1.32-3.187-.008-4.492l2.593-2.601c1.32-1.313 3.18-1.32 4.5 0 1.329 1.328 1.313 3.187.008 4.5l-1.328 1.32c.25.578.336 1.281.195 1.89l2.235-2.226c1.922-1.914 1.93-4.649-.008-6.586C13.512.39 10.793.406 8.871 2.328L6.152 5.047c-1.922 1.922-1.93 4.648.008 6.586.453.46 1.078.805 1.977.969zm-.008 3.68l2.719-2.727c1.922-1.922 1.93-4.649-.008-6.586-.453-.453-1.07-.797-1.977-.969L7.668 7.21c.922.087 1.586.384 2.062.86 1.329 1.32 1.32 3.188.008 4.5l-2.593 2.594c-1.32 1.32-3.18 1.32-4.493 0-1.328-1.328-1.32-3.18-.007-4.492l1.32-1.328a3.195 3.195 0 01-.195-1.89L1.535 9.687c-1.922 1.914-1.93 4.64.008 6.578 1.945 1.945 4.664 1.93 6.586.015z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

const Chain = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <Styled className="icon chain-icon" {...props}>
            <ChainVector />
        </Styled>
    );
};

export default Chain;
