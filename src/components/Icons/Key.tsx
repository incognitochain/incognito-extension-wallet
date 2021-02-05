import React, { useEffect, useRef } from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { IGeneralLanguage } from '../../i18n';
import { translateByFieldSelector } from '../../module/Configs';
import { actionRemoveTooltip, actionShowTooltip } from '../../module/Tooltip';

interface IProps {}

const Styled = styled.button`
    width: 32px;
    height: 21px;
`;

const id = 'key';

const Key = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const iconRef: any = useRef();
    const dispatch = useDispatch();
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
        <Styled className="icon" {...props} onMouseOver={handleHover} onMouseOut={handleHoverOut}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/key.png`} alt="key" ref={iconRef} />
        </Styled>
    );
};

export default Key;
