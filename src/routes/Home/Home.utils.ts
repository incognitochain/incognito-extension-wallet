import { split } from 'lodash';
import { ENVS } from 'src/configs';

export const checkOutdatedVersion = (appVersion: string) => {
  const currentAppVersion = split(ENVS.REACT_APP_VERSION, '.').map((item) =>
    Number(item)
  );
  const newAppVersions = split(appVersion, '.').map((item) => Number(item));
  return currentAppVersion
    .slice(0, 2)
    .some((item, index) => item < newAppVersions[index]);
};
