import apiCode from './apiCode';
import knownCode from './knownCode';
import webjsCode from './webjsCode';

const code = {
  ...knownCode,
  ...apiCode,
  ...webjsCode,
};

export default code;
