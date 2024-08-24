import {create} from 'zustand';
import {
  IApiResponse,
  INewsArticle,
  NewsApiResponse,
  StoreInitialState,
} from '../types/api.types';
import {makeGetRequest} from '../services/https.service';
import {ENDPOINT_URL} from '../constants';
import {
  getNewsFromLocalStorage,
  processNewsHeadlinesResponse,
  setNewsInLocalStorage,
} from '../utils';
import {fetch} from '@react-native-community/netinfo';

const useAppStore = create<StoreInitialState>((set, get) => ({
  newsHeadlines: [],
  loading: false,
  error: null,
  page: 1,
  fetchHeadlines: async () => {
    set({loading: true, error: null});
    try {
      const {isConnected} = await fetch();
      if (!isConnected) {
        const articles = getNewsFromLocalStorage();
        set({newsHeadlines: articles, loading: false});
        return;
      }
      const {page} = get();
      const queryParams = {
        q: 'technology',
        sortBy: 'publishedAt',
        page: page,
      };
      const response: IApiResponse<NewsApiResponse> = await makeGetRequest(
        ENDPOINT_URL.EVERYTHING,
        queryParams,
      );
      const newsHeadlines: INewsArticle[] =
        processNewsHeadlinesResponse(response);
      set({newsHeadlines: newsHeadlines, loading: false});
      setNewsInLocalStorage(newsHeadlines);
    } catch (error: any) {
      set({
        error: error.message,
        loading: false,
      });
    }
  },
}));

export default useAppStore;
