import React, { useEffect, useRef } from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { actionRemoveTooltip, actionShowTooltip } from 'src/module/Tooltip';
import { IGeneralLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';

interface IProps {
    text?: string;
}

const Styled = styled.button`
    width: 18px;
    height: 18px;
`;

const id = 'copy';

const Copy = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const { text } = props;
    const iconRef: any = useRef();
    const dispatch = useDispatch();
    const translate: IGeneralLanguage = useSelector(translateByFieldSelector)('general');

    const handleCopyText = () => {
        if (text) {
            copy(text);

            dispatch(
                actionShowTooltip({
                    text: translate.copied,
                    ref: iconRef ? iconRef.current : null,
                }),
            );
        }
    };

    const handleHover = () => {
        dispatch(
            actionShowTooltip({
                id,
                text: translate.copy,
                ref: iconRef ? iconRef.current : null,
                timeout: 0,
            }),
        );
    };

    const handleHoverOut = () => {
        dispatch(actionRemoveTooltip(id));
    };

    useEffect(() => {
        return () => {
            dispatch(actionRemoveTooltip(id));
        };
    });

    return (
        <Styled
            className="icon"
            onClick={handleCopyText}
            {...props}
            onMouseOver={handleHover}
            onMouseOut={handleHoverOut}
        >
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/copy.png`} alt="" ref={iconRef} />
        </Styled>
    );
};

export default Copy;
