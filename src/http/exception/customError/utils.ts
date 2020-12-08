/**
 *
 * @param {number} number
 * Make sure `number` is unique!!!
 */
export const genCode = (type: string, number: number) => {
  return `${type}(${number})`;
};

/**
 *
 * @param {number} number
 * Make sure `number` is unique!!!
 */
export const codeCreator = (type: string) => {
  const codes: {
    [key: string]: any;
  } = {};
  return (number: number) => {
    if (codes[number]) throw new Error(`Code ${number} is existed!`);
    codes[number] = true;
    return genCode(type, number);
  };
};
