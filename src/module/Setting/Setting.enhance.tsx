import React from 'react';
import { compose } from 'recompose';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { withLayout } from 'src/components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { ILanguage } from 'src/i18n';
import { translateSelector } from '../Configs';
import { actionToggleHomeConfigs } from './Setting.actions';
import { IInner } from './Setting.interface';
import { ISettingItem } from './features/SettingItem';
import { chainURLSelector } from 'src/module/Preload';
import { devSettingSelector } from './Setting.selector';
import { route as networkRoute } from './features/Network';

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const translate: ILanguage = useSelector(translateSelector);
  const settingTranslate = translate.setting;
  const dispatch = useDispatch();
  const handleToggleHomeConfigs = () => dispatch(actionToggleHomeConfigs());
  const chainURL = useSelector(chainURLSelector);
  const { stagingHomeConfigs } = useSelector(devSettingSelector);
  const settingFactories: ISettingItem[] = [
    {
      title: settingTranslate.network.headerTitle,
      child: [{ desc: chainURL, link: networkRoute }],
    },
    {
      title: settingTranslate.dev.headerTitle,
      child: [
        {
          desc: settingTranslate.dev.homeConfigs,
          toggle: true,
          onClick: handleToggleHomeConfigs,
          toggleValue: stagingHomeConfigs,
        },
      ],
    },
  ];
  return (
    <ErrorBoundary>
      <WrappedComponent {...{ ...props, settingFactories }} />
    </ErrorBoundary>
  );
};

export default compose<IInner, any>(withLayout, enhance);
