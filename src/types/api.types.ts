export interface StoreInitialState {
  newsHeadlines: INewsArticle[];
  loading: boolean;
  error: string | null;
  page: number;
  fetchHeadlines: () => Promise<void>;
}

export interface IApiResponse<T> {
  status: string;
  message: string;
  data?: T | null;
}
export interface INewsArticle {
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
