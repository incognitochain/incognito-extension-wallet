import isEmpty from 'lodash/isEmpty';

interface IENVS {
  MODE: string;
  IS_DEV: boolean;
  DOMAIN_URL: string;
}

const defaultEnvs = {
  MODE: 'development',
  IS_DEV: true,
  DOMAIN_URL: 'http://localhost:3000',
};

export const getEnvs = () => {
  let envs: any = {};
  try {
    const PROCCESS_ENV = process.env;
    console.debug(`DOMAIN_URL`, process.env.DOMAIN_URL);
    console.debug(`PROCCESS_ENV`, PROCCESS_ENV);
    if (!isEmpty(PROCCESS_ENV)) {
      Object.keys(PROCCESS_ENV).map((key) => (envs[key] = PROCCESS_ENV[key]));
    }
  } catch (error) {
    console.debug(`ERROR`, error);
  } finally {
    envs = isEmpty(envs) ? defaultEnvs : envs;
  }
  console.debug(`ENVS`, envs);
  return envs;
};

export const ENVS: IENVS = getEnvs();
