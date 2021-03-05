import React, { useEffect, useRef } from 'react';
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
    width: 19px;
    height: 19px;
`;

const CopyVector = React.memo((props: any) => {
    return (
        <svg width={19} height={19}>
            <path
                d="M16.088 18.874c1.828 0 2.75-.914 2.75-2.725V7.255c0-1.81-.922-2.725-2.75-2.725h-1.512V3.186c0-1.811-.923-2.725-2.75-2.725H3c-1.846 0-2.76.914-2.76 2.725v8.894c0 1.81.914 2.725 2.76 2.725h1.503v1.344c0 1.811.914 2.725 2.76 2.725h8.824zM4.504 13.39H3.019c-.88 0-1.363-.475-1.363-1.389V3.265c0-.914.484-1.389 1.363-1.389h8.78c.87 0 1.362.475 1.362 1.389V4.53H7.264c-1.846 0-2.76.906-2.76 2.725v6.135zm11.558 4.069h-8.78c-.87 0-1.363-.475-1.363-1.389V7.334c0-.914.492-1.389 1.362-1.389h8.78c.87 0 1.363.475 1.363 1.389v8.736c0 .914-.492 1.389-1.362 1.389z"
                fill="#000"
                fillRule="nonzero"
                {...props}
            />
        </svg>
    );
});

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
            <div ref={iconRef}>
                <CopyVector />
            </div>
        </Styled>
    );
};

export default Copy;
