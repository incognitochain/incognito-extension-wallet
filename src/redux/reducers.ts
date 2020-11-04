import { combineReducers } from 'redux';
import { camelCase } from 'lodash';

const requireModule = require.context('../../src', true, /\.reducer.ts/); //extract [reducerName].reducer.ts files inside redux folder

const reducers: any = {};

requireModule.keys().forEach((fileName: any) => {
  try {
    const reducerName = camelCase(fileName?.match(/(\w{1,})(.reducer.ts)/)[1]);
    reducers[reducerName] = requireModule(fileName).default;
  } catch (error) {
    console.debug(`ERROR`, error);
  }
});

export default combineReducers({
  ...reducers,
});
