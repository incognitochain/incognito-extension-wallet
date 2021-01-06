import React, { useCallback } from 'react';
import { compose } from 'recompose';
import { useDispatch } from 'react-redux';
import { IProps } from './Modal.interface';
import { actionToggleModal } from './Modal.actions';

const enhance = (WrappedComponent: React.FunctionComponent<IProps>) => (props: IProps) => {
    const dispatch = useDispatch();

    const handleClose = useCallback(() => {
        dispatch(actionToggleModal({}));
    }, []);

    return <WrappedComponent {...props} onClose={handleClose} />;
};

export default compose<IProps, any>(enhance);
