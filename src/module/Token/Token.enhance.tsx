import React, { SyntheticEvent } from 'react';
import { compose } from 'recompose';
import { ITokenProps } from './Token.interface';

interface TInner {
    handleOnClick: () => void;
}

export interface IMergePropsToken extends TInner, ITokenProps {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: ITokenProps & any) => {
    const { handleSelectToken } = props;
    const handleOnClick = (e: SyntheticEvent) => {
        e.preventDefault();
        if (typeof handleSelectToken === 'function') {
            handleSelectToken();
        }
    };
    return <WrappedComponent {...{ ...props, handleOnClick }} />;
};

export default compose<IMergePropsToken, any>(enhance);
