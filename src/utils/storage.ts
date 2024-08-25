import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

export const setNewsInLocalStorage = (key: string, value: any) => {
  storage.set(key, JSON.stringify(value));
};

export const getNewsFromLocalStorage = (key: string) => {
  try {
    if (storage.contains(key)) {
      const jsonNews = storage.getString(key) || '';
      return JSON.parse(jsonNews);
    }
    return [];
  } catch (error) {
    return [];
  }
};

export const clearLocalStorage = () => {
  storage.clearAll();
};
export const deleteFromLocalStorage = (key: string) => {
  storage.delete(key);
};
