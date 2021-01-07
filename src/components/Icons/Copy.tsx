import React, { useRef } from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { actionShowTooltip } from 'src/module/Tooltip';

interface IProps {
    text?: string;
    tooltip?: string;
}

const Styled = styled.button`
    width: 18px;
    height: 18px;
`;

const Copy = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { text, tooltip } = props;
    const iconRef: any = useRef();
    const dispatch = useDispatch();

    const handleCopyText = () => {
        if (text) {
            copy(text);

            if (tooltip) {
                dispatch(
                    actionShowTooltip({
                        text: tooltip,
                        ref: iconRef ? iconRef.current : null,
                    }),
                );
            }
        }
    };

    return (
        <Styled className="icon" onClick={handleCopyText} {...props}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/copy.png`} alt="" ref={iconRef} />
        </Styled>
    );
};

export default Copy;
