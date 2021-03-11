import React from 'react';
import { Tab, CoinsShieldModal } from 'src/module/Bridge/Components';
import Modal, { actionToggleModal } from 'src/components/Modal';
import { useDispatch } from 'react-redux';
import { Wrapper } from './styled';

const BridgeContent = React.memo(() => {
    const dispatch = useDispatch();
    return (
        <Wrapper>
            <Tab />
            <Modal />
            <button
                type="button"
                onClick={() =>
                    dispatch(
                        actionToggleModal({
                            data: <CoinsShieldModal />,
                            closeable: true,
                        }),
                    )
                }
            >
                click me
            </button>
        </Wrapper>
    );
});

export default BridgeContent;
