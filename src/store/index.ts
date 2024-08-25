import {create} from 'zustand';
import {
  IApiResponse,
  INewsArticle,
  NewsApiResponse,
  PinnedHeadlinesProps,
  StoreInitialState,
} from '../types/api.types';
import {makeGetRequest} from '../services/https.service';
import {ENDPOINT_URL, STORAGE} from '../constants';
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
  localPageNumber: 1,
  pinnedArticles: [],
  fetchHeadlines: async () => {
    set({loading: true, error: null, localPageNumber: 1});
    try {
      const {isConnected} = await fetch();
      if (!isConnected) {
        const articles = getNewsFromLocalStorage(STORAGE.NEWS_HEADLINES);
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
      setNewsInLocalStorage(STORAGE.NEWS_HEADLINES, newsHeadlines);
    } catch (error: any) {
      console.log('Error in api', error);
      set({
        error: error.message,
        loading: false,
      });
    }
  },
  incrementLocalPageNumber: () => {
    set(state => ({localPageNumber: state.localPageNumber + 1}));
  },
  incrementNewsApiPageNumber: () => {
    set(state => ({page: state.page + 1}));
  },
  setPinnedHeadlines: ({article}: PinnedHeadlinesProps) => {
    const pinnedArticles = getNewsFromLocalStorage(STORAGE.PINNED_ARTICLES);
    if (article) {
      const isArticleAlreadyPinned = pinnedArticles.some(
        (item: INewsArticle) => article.id === item.id,
      );

      if (isArticleAlreadyPinned) {
        // remove if already pinned
        const updatedArticle = {
          ...article,
          isPinned: false,
        };
        const removedFromPinnedArticles = pinnedArticles.filter(
          (item: INewsArticle) => item.id !== updatedArticle.id,
        );
        set({pinnedArticles: removedFromPinnedArticles});
        setNewsInLocalStorage(
          STORAGE.PINNED_ARTICLES,
          removedFromPinnedArticles,
        );
      } else {
        // add if not pinned
        const updatedArticle = {
          ...article,
          isPinned: true,
          id: `${new Date().toISOString()}_${article.id}`,
        };

        const updatedArticles = [...pinnedArticles, updatedArticle];
        set({pinnedArticles: updatedArticles});
        setNewsInLocalStorage(STORAGE.PINNED_ARTICLES, updatedArticles);
      }
    } else {
      set({pinnedArticles: pinnedArticles});
    }
  },
}));

export default useAppStore;
