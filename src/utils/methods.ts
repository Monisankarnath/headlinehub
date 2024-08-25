import {IApiResponse, INewsArticle, NewsApiResponse} from 'api.types';
import {API_STATES} from '..//constants';

export const processNewsHeadlinesResponse = (
  response: IApiResponse<NewsApiResponse>,
): INewsArticle[] => {
  if (response.status === API_STATES.SUCCESS && response.data) {
    return response.data.articles.map((item, index) => ({
      id: `${index + 1}`,
      isPinned: false,
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

export const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString);

  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const minutesStr = minutes < 10 ? '0' + minutes : minutes;
  return `${hours}:${minutesStr} ${ampm}`;
};
