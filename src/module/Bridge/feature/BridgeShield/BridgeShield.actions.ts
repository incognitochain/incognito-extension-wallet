import { ISelectedPrivacy } from 'src/module/Token';
import BRIDGE_SHIELD_ACTION_NAME from './BridgeShield.actionsName';

export const actionSelectShieldToken = (payload: { shieldToken: ISelectedPrivacy }) => ({
    type: BRIDGE_SHIELD_ACTION_NAME.SELECT_SHIELD_TOKEN,
    payload,
});
