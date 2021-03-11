import React from 'react';
import { useSelector } from 'react-redux';
import { translateByFieldSelector } from 'src/module/Configs';
import { Wrapper, Button } from './styled';

const Information = React.memo(() => {
    const { info: translate } = useSelector(translateByFieldSelector)('bridge');
    const onPressHowWork = () => {};
    const onPressPrivacy = () => {};
    return (
        <Wrapper>
            <p className="title1 fw-medium fs-avglarge">{translate.title1}</p>
            <p className="title2 fw-medium fs-avglarge">{translate.title2}</p>
            <p className="title3 fw-regular fs-regular">{translate.title3}</p>
            <Button marginTop="15px" onClick={onPressHowWork}>
                {translate.btn1}
            </Button>
            <Button marginTop="5px" onClick={onPressPrivacy}>
                {translate.btn2}
            </Button>
        </Wrapper>
    );
});

export default Information;
