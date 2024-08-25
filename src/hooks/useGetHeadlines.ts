import {useEffect, useRef, useState, useCallback} from 'react';
import useAppStore from '../store';
import {INewsArticle} from 'api.types';

export const useGetHeadlines = () => {
  const {
    localPageNumber,
    newsHeadlines,
    incrementLocalPageNumber,
    incrementNewsApiPageNumber,
    fetchHeadlines,
    loading,
  } = useAppStore();
  const [currentHeadlines, setCurrentHeadlines] = useState<INewsArticle[]>([]);
  const intervalRef = useRef<number | null>(null);
  const deleteArticle = (id: string) => {
    const updatedHeadlines = currentHeadlines.filter(
      article => article.id !== id,
    );
    setCurrentHeadlines(updatedHeadlines);
  };
  const clearHeadlineInterval = () => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };
  const startInterval = useCallback(() => {
    if (intervalRef.current === null) {
      intervalRef.current = window.setInterval(() => {
        incrementLocalPageNumber();
      }, 10000);
    }
  }, [incrementLocalPageNumber]);

  const updateHeadlines = useCallback(() => {
    const numberOfArticles = localPageNumber === 1 ? 10 : 5;
    const startNegative = localPageNumber === 1 ? 1 : 0;
    const start = (localPageNumber - startNegative) * numberOfArticles;
    const end = start + numberOfArticles;
    const nextHeadlines = newsHeadlines.slice(start, end);
    console.log('start end', start, end);
    if (nextHeadlines.length > 0) {
      setCurrentHeadlines(prevHeadlines => [
        ...nextHeadlines,
        ...prevHeadlines,
      ]);
    }
    startInterval();
    if (start >= newsHeadlines.length) {
      clearHeadlineInterval();
      incrementNewsApiPageNumber();
      fetchHeadlines();
    }
  }, [
    localPageNumber,
    newsHeadlines,
    incrementNewsApiPageNumber,
    fetchHeadlines,
    startInterval,
  ]);

  const loadNextHeadlines = useCallback(() => {
    clearHeadlineInterval();
    incrementLocalPageNumber();
  }, [incrementLocalPageNumber]);

  useEffect(() => {
    if (loading) {
      clearHeadlineInterval();
    } else if (!loading && newsHeadlines.length > 0) {
      updateHeadlines();
    }
    return () => clearHeadlineInterval();
  }, [loading, localPageNumber, newsHeadlines, updateHeadlines]);

  return {currentHeadlines, loadNextHeadlines, deleteArticle};
};
