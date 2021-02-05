import isEmpty from 'lodash/isEmpty';

interface IENVS {
    REACT_APP_MODE: string;
    REACT_APP_IS_DEV: boolean;
    REACT_APP_DOMAIN_URL: string;
    REACT_APP_PASSWORD_SECRET_KEY: string;
    REACT_APP_PASSPHRASE_WALLET_DEFAULT: string;
    REACT_APP_HOME_CONFIG: string;
    REACT_APP_VERSION: string;
    REACT_APP_WALLET_NAME: string;
    REACT_APP_TOGGLE_REDUX_LOGGER: string;
}

const defaultEnvs = {
    REACT_APP_MODE: 'development',
    REACT_APP_IS_DEV: 'true',
    REACT_APP_DOMAIN_URL: 'http://192.168.0.124:3000',
    REACT_APP_PASSPHRASE_WALLET_DEFAULT: '',
    REACT_APP_PASSWORD_SECRET_KEY: '',
    REACT_APP_HOME_CONFIG: 'staging',
    REACT_APP_VERSION: '1.0',
    REACT_APP_WALLET_NAME: '',
    REACT_APP_TOGGLE_REDUX_LOGGER: 'false',
};

export const getEnvs = () => {
    let envs: any = {};
    try {
        const PROCCESS_ENV = process.env;
        if (!isEmpty(PROCCESS_ENV)) {
            Object.keys(PROCCESS_ENV).map((key: string) => {
                envs[key] = PROCCESS_ENV[key];
                return key;
            });
        }
    } catch (error) {
        console.debug(error);
    } finally {
        envs = isEmpty(envs) ? defaultEnvs : envs;
    }
    return { ...envs, REACT_APP_DOMAIN_URL: window.location.origin };
};

export const ENVS: IENVS = getEnvs();

export const isDev: boolean = ENVS.REACT_APP_MODE === 'development';

export const isToggleReduxLogger = ENVS.REACT_APP_TOGGLE_REDUX_LOGGER === 'true';
