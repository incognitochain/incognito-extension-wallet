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
            <text
                transform="translate(-263 -180)"
                fill="#FFF"
                fillRule="evenodd"
                fontFamily="SFProDisplay-Regular, SF Pro Display"
                fontSize={18}
                {...props}
            >
                <tspan x={261} y={196}>
                    {'\uDBC1\uDC05'}
                </tspan>
            </text>
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
