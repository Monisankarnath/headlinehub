import {IApiResponse, INewsArticle, NewsApiResponse} from 'api.types';
import {API_STATES} from '..//constants';

export const processNewsHeadlinesResponse = (
  response: IApiResponse<NewsApiResponse>,
): INewsArticle[] => {
  if (response.status === API_STATES.SUCCESS && response.data) {
    return response.data.articles.map(item => ({
      source: {
        name: item.source.name,
      },
      title: item.title,
      author: item.author,
      publishedAt: item.publishedAt,
      urlToImage: item.urlToImage,
    }));
  }
  return [];
};
