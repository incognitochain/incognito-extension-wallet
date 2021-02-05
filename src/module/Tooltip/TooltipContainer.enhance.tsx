import React from 'react';
import { compose } from 'recompose';
import { useSelector } from 'react-redux';
import { IProps } from './Tooltip.interface';
import { tooltipSelector } from './Tooltip.selector';

const enhance = (WrappedComponent: React.FunctionComponent<IProps>) => (props: IProps) => {
    const tooltips = useSelector(tooltipSelector);
    return <WrappedComponent {...props} tooltips={tooltips} />;
};

export default compose<IProps, any>(enhance);
