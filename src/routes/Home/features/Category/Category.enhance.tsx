import { lowerCase } from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { compose } from 'recompose';
import { CRYPTO_SYMBOL } from 'src/constants/coin';
import { ICategoryItem } from './Category.interface';

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
  const history = useHistory();
  const goToScreen = (route: string, params: any) => {
    const path = `/${lowerCase(route)}`;
    history.push(path, { ...params, headerTitle: route });
  };

  const sendFeedback = () => {};
  const interactionById = (item: ICategoryItem) => {
    switch (item.key) {
      case 'buy_prv':
        goToScreen(item?.route || '', {
          inputTokenId: CRYPTO_SYMBOL.USDT,
          outputTokenId: CRYPTO_SYMBOL.PRV,
          outputValue: 1750e9,
        });
        break;
      case 'trade':
        goToScreen(item?.route || '', {});
        break;
      case 'feedback':
        sendFeedback();
        break;
      case 'explorer':
        goToScreen('pApp', { url: item?.route });
        break;
      default:
        goToScreen(item?.route, {});
        break;
    }
  };
  return <WrappedComponent {...{ ...props, interactionById }} />;
};

export default compose<any, any>(enhance);
