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
    const start = (localPageNumber - 1) * 5;
    const end = localPageNumber * 5;
    const nextHeadlines = newsHeadlines.slice(start, end);
    if (nextHeadlines.length > 0) {
      setCurrentHeadlines(nextHeadlines);
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

  return {currentHeadlines, loadNextHeadlines};
};
