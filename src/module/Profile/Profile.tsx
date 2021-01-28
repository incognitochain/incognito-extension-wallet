import React from 'react';
import withEnhance from 'src/module/Profile/Profile.enhance';
import copy from 'copy-to-clipboard';
import { useDispatch } from 'react-redux';
import { Styled } from './Profile.styled';
import { actionToggleToast, TOAST_CONFIGS } from '../../components';
import { ellipsisCenter } from '../../utils';

const Profile = React.memo((props: any) => {
    const { userProfile } = props;
    const dispatch = useDispatch();
    const handleCopyData = (text?: string) => {
        try {
            if (!text) return;
            copy(text);
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: 'Copied',
                    type: TOAST_CONFIGS.success,
                }),
            );
        } catch (error) {
            console.debug(error);
        }
    };
    const renderItem = (key: string) => {
        let text = userProfile[key];
        if (key === 'token') text = ellipsisCenter({ str: text, limit: 15 });
        return (
            <div className="item" key={key} onClick={() => handleCopyData(userProfile[key])}>
                <p className="title">{`${key}: `}</p>
                <p>{text}</p>
            </div>
        );
    };
    return <Styled className="scroll-view">{Object.keys(userProfile).map(renderItem)}</Styled>;
});

export default withEnhance(Profile);
