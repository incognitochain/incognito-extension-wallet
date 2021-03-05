import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { darkModeSelector } from 'src/module/Setting';
import { IGeneralLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import { actionRemoveTooltip, actionShowTooltip } from 'src/module/Tooltip';
import { COLORS } from 'src/styles';

interface IProps {}

const Styled = styled.button<{ darkMode: boolean }>`
    width: 37px;
    height: 23px;
    svg {
        .stroke {
            fill: ${(props) => (props?.darkMode ? COLORS.black2 : COLORS.colorGrey)};
            stroke: ${(props) => (props?.darkMode ? COLORS.black1 : COLORS.colorKeyGrey)};
        }
    }
`;

const KeyVector = React.memo((props: any) => {
    return (
        <svg width={37} height={23} {...props}>
            <g fill="none" fillRule="evenodd">
                <path
                    d="M7.41 1h22.18c2.23 0 3.037.232 3.852.668a4.543 4.543 0 011.89 1.89c.436.815.668 1.623.668 3.852v8.18c0 2.23-.232 3.037-.668 3.852a4.543 4.543 0 01-1.89 1.89c-.815.436-1.623.668-3.852.668H7.41c-2.23 0-3.037-.232-3.852-.668a4.543 4.543 0 01-1.89-1.89C1.232 18.627 1 17.82 1 15.59V7.41c0-2.23.232-3.037.668-3.852a4.543 4.543 0 011.89-1.89C4.373 1.232 5.18 1 7.41 1z"
                    fill="#121212"
                    className="stroke"
                />
                <path
                    d="M28.418 8.474c1.959 1.959 1.951 5.127.013 7.065-1.938 1.937-5.12 1.959-7.078 0a5.001 5.001 0 01-1.27-2.16l-6.148-.01.003 1.644a.791.791 0 01-.808.808l-2.588-.005a.798.798 0 01-.81-.81l-.004-1.645h-.35A1.393 1.393 0 018 11.982a1.358 1.358 0 011.36-1.387l10.717.007a4.954 4.954 0 011.263-2.155c1.938-1.938 5.12-1.932 7.078.026zm-5.106 1.946a2.234 2.234 0 00.006 3.154c.865.892 2.28.88 3.155.006a2.234 2.234 0 00-.006-3.154 2.234 2.234 0 00-3.155-.006z"
                    fill="#8A8A8E"
                />
            </g>
        </svg>
    );
});

const id = 'key';

const Key = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const iconRef: any = useRef();
    const dispatch = useDispatch();
    const darkMode = useSelector(darkModeSelector);
    const translate: IGeneralLanguage = useSelector(translateByFieldSelector)('general');

    const handleHover = () => {
        dispatch(
            actionShowTooltip({
                id,
                text: translate.seeKey,
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
        <Styled darkMode={darkMode} className="icon" {...props} onMouseOver={handleHover} onMouseOut={handleHoverOut}>
            <span ref={iconRef}>
                <KeyVector />
            </span>
        </Styled>
    );
};

export default Key;
