import {MMKV} from 'react-native-mmkv';
import {STORAGE} from '../constants';

const storage = new MMKV();

export const setNewsInLocalStorage = (value: any) => {
  storage.set(STORAGE.NEWS_HEADLINES, JSON.stringify(value));
};

export const getNewsFromLocalStorage = () => {
  if (storage.contains(STORAGE.NEWS_HEADLINES)) {
    const jsonNews = storage.getString(STORAGE.NEWS_HEADLINES) || '';
    return JSON.parse(jsonNews);
  }
  return [];
};

export const clearLocalStorage = () => {
  storage.clearAll();
};
