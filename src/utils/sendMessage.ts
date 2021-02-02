import APP_CONSTANT from 'src/constants/app';
import { isDev } from 'src/configs';

export const sendExtensionMessage = (name: string, data: any = {}) => {
    try {
        return new Promise((resolve) => {
            if (isDev) return resolve(null);
            chrome.runtime.sendMessage(
                {
                    name,
                    data: { name, ...data },
                },
                (reponse) => {
                    resolve(reponse);
                    console.debug(`${APP_CONSTANT.BACKGROUND_LISTEN.SELECTED_CONNECT_ACCOUNT}: ${reponse}`);
                },
            );
        });
    } catch (error) {
        /* Ignored error */
    }
};

export const sendPasswordToBackground = async (pass: string, chainURL: string) => {
    try {
        await sendExtensionMessage(APP_CONSTANT.BACKGROUND_LISTEN.UPDATE_PASS_WORD, {
            password: pass,
            chainURL,
        });
    } catch (e) {
        /* Ignored error */
    }
};
