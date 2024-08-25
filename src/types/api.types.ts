export interface StoreInitialState {
  newsHeadlines: INewsArticle[];
  loading: boolean;
  error: string | null;
  page: number;
  localPageNumber: number;
  pinnedArticles: INewsArticle[];
  fetchHeadlines: () => Promise<void>;
  incrementLocalPageNumber: () => void;
  incrementNewsApiPageNumber: () => void;
  setPinnedHeadlines: (prop: PinnedHeadlinesProps) => void;
}

export interface IApiResponse<T> {
  status: string;
  message: string;
  data?: T | null;
}
export interface INewsArticle {
  id: string;
  isPinned: boolean;
  source: {
    name: string;
  };
  author: string;
  title: string;
  urlToImage: string;
  publishedAt: string;
}
export interface NewsApiResponse {
  articles: INewsArticle[];
}

export interface IAPIErrorResponse {
  status: string;
  code: string;
  message: string;
}

export interface PinnedHeadlinesProps {
  article?: INewsArticle | null;
}
