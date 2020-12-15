import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Header } from 'src/components';
import { withLayout } from 'src/components/Layout';
import { ILanguage } from 'src/i18n';
import { translateSelector } from 'src/module/Configs';
import { actionSetConfigs, actionSetServer } from 'src/module/Preload';
import { DEFAULT_LIST_SERVER, IServer } from 'src/services';
import { FONT_SIZES } from 'src/styles';
import styled from 'styled-components';

interface IProps {}

interface INetworkItem {
  title: string;
  desc: string;
  onChangeNetwork?: () => void;
}

const Styled = styled.div`
  cursor: pointer;
  .network-item {
    margin-bottom: 30px;
  }
  .network-item .title {
    font-size: ${FONT_SIZES.medium}px;
    line-height: ${FONT_SIZES.medium + 5}px;
    margin-bottom: 15px;
  }
  .network-item .desc {
    font-size: ${FONT_SIZES.regular}px;
    line-height: ${FONT_SIZES.regular + 5}px;
  }
`;

const NetworkItem = React.memo((props: INetworkItem) => {
  const { title, desc, onChangeNetwork } = props;
  const handleClick = () =>
    typeof onChangeNetwork === 'function' && onChangeNetwork();
  return (
    <div className='network-item' onClick={handleClick}>
      <label className='title'>{title}</label>
      <p className='desc'>{desc}</p>
    </div>
  );
});

declare const window: Window;

const Network = (props: IProps) => {
  const translate: ILanguage = useSelector(translateSelector);
  const networkTranslate = translate.setting.network;
  const dispatch = useDispatch();
  const handleChangeNetwork = async (server: IServer) => {
    try {
      await dispatch(
        actionSetConfigs({
          mainnet: !!server.default,
          apiURL: server.apiURL || '',
          chainURL: server.chainURL || '',
        })
      );
      await dispatch(actionSetServer(server));
    } catch (error) {
      throw error;
    }
    !!window && window.location.assign('/');
  };
  return (
    <Styled>
      <Header title={networkTranslate.title} />
      {DEFAULT_LIST_SERVER.map((server) => (
        <NetworkItem
          key={server.id}
          title={server.name}
          desc={server.address}
          onChangeNetwork={() => handleChangeNetwork(server)}
        />
      ))}
    </Styled>
  );
};

export default withLayout(Network);
