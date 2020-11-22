import IndexedDB from './IndexedDB';

export const DB_NAME = 'incognito-database';

export const initIncognitoDB = async () => {
  let incognitoDB;
  try {
    incognitoDB = new IndexedDB(DB_NAME);
    const objectStore = ['wallet'];
    incognitoDB = await incognitoDB.createObjectStore(objectStore);
  } catch (error) {
    throw error;
  }
  return incognitoDB;
};
