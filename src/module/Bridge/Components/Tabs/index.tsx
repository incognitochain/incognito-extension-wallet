import React from 'react';
import { Row } from 'src/components';
import { useDispatch, useSelector } from 'react-redux';
import { translateByFieldSelector } from 'src/module/Configs';
import { TAB_SELECTOR } from 'src/module/Bridge/Bridge.constant';
import { tabSelector } from 'src/module/Bridge/Bridge.selector';
import { actionSelectHeaderTab } from 'src/module/Bridge/Bridge.actions';
import { Button } from './styled';

const Tab = React.memo(() => {
    const { shield, unShield } = useSelector(translateByFieldSelector)('bridge');
    const selected = useSelector(tabSelector);
    const dispatch = useDispatch();
    const onSelectTab = (tab: string) => {
        if (tab === selected) return;
        dispatch(actionSelectHeaderTab({ tab }));
    };
    return (
        <Row>
            <Button selected={selected === TAB_SELECTOR.SHIELD} onClick={() => onSelectTab(TAB_SELECTOR.SHIELD)}>
                {shield}
            </Button>
            <Button selected={selected === TAB_SELECTOR.UNSHIELD} onClick={() => onSelectTab(TAB_SELECTOR.UNSHIELD)}>
                {unShield}
            </Button>
        </Row>
    );
});

export default Tab;
