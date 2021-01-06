import React from 'react';
import { ENVS } from 'src/configs';
import styled from 'styled-components';
import copy from 'copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';
import { actionToggleToast, TOAST_CONFIGS } from '../Core/Toast';
import { IGeneralLanguage } from '../../i18n';
import { translateByFieldSelector } from '../../module/Configs';

interface IProps {
    text?: string;
}

const Styled = styled.button`
    width: 18px;
    height: 18px;
`;

const Copy = (props: IProps & React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const dispatch = useDispatch();
    const translate: IGeneralLanguage = useSelector(translateByFieldSelector)('general');

    const handleCopyText = () => {
        console.debug('COPIED');
        const { text } = props;

        if (text) {
            copy(text);
            dispatch(
                actionToggleToast({
                    toggle: true,
                    type: TOAST_CONFIGS.success,
                    value: translate.copied,
                }),
            );
        }
    };

    return (
        <Styled className="icon" onClick={handleCopyText} {...props}>
            <img src={`${ENVS.REACT_APP_DOMAIN_URL}/images/icons/copy.png`} alt="" />
        </Styled>
    );
};

export default Copy;
