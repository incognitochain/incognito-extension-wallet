import { CONSTANT_CONFIGS } from 'src/constants';
import axios from 'axios';

export const apiGetHomeConfigs = () =>
  axios.get(CONSTANT_CONFIGS.HOME_CONFIG_DATA);

export const apiGetAppVersion = () => axios.get(CONSTANT_CONFIGS.APP_VERSION);
