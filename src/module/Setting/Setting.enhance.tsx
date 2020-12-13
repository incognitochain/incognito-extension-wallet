import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { ISettingLanguage } from 'src/i18n/interface';
import { translateByFieldSelector } from 'src/module/Configs';
import { route as addressBookRoute } from 'src/module/AddressBook';
import { actionToggleHomeConfigs } from './Setting.actions';
import { IInner } from './Setting.interface';
import { ISettingItem } from './features/SettingItem';
import { chainURLSelector } from 'src/module/Preload';
import { devSettingSelector } from './Setting.selector';
import { route as networkRoute } from './features/Network';

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const translate: ISettingLanguage = useSelector(translateByFieldSelector)(
    'setting'
  );
  const dispatch = useDispatch();
  const handleToggleHomeConfigs = () => dispatch(actionToggleHomeConfigs());
  const chainURL = useSelector(chainURLSelector);
  const { stagingHomeConfigs } = useSelector(devSettingSelector);
  const settingFactories: ISettingItem[] = [
    {
      title: translate.network.title,
      child: [{ desc: chainURL, link: networkRoute }],
    },
    {
      title: translate.dev.title,
      child: [
        {
          desc: translate.dev.homeConfigs,
          toggle: true,
          onClick: handleToggleHomeConfigs,
          toggleValue: stagingHomeConfigs,
        },
      ],
    },
    {
      title: translate.addressBook.title,
      child: [{ desc: translate.addressBook.desc, link: addressBookRoute }],
    },
  ];
  return (
    <ErrorBoundary>
      <WrappedComponent {...{ ...props, settingFactories }} />
    </ErrorBoundary>
  );
};

export default compose<IInner, any>(withLayout, enhance);
