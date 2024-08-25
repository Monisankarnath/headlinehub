import React from 'react';
import useAppStore from '../../store';
import {HeadLineCard} from './HeadlineCard';
import HeadlineSkeleton from './HeadlineSkeleton';
import {INewsArticle} from 'api.types';
import {ScrollView} from 'react-native';

type HeadlinesProps = {
  headlines: INewsArticle[];
  deleteArticle: (id: string) => void;
};
export const Headlines: React.FC<HeadlinesProps> = ({
  headlines,
  deleteArticle,
}) => {
  const {pinnedArticles} = useAppStore();
  const pinned = pinnedArticles.reverse();
  const recent = headlines.filter(article => !pinnedArticles.includes(article));
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1}}>
      {pinned.length
        ? pinned.map((article, i) => (
            <HeadLineCard
              key={i}
              item={article}
              deleteArticle={deleteArticle}
            />
          ))
        : null}
      {recent.length ? (
        recent.map((article, i) => (
          <HeadLineCard key={i} item={article} deleteArticle={deleteArticle} />
        ))
      ) : (
        <HeadlineSkeleton />
      )}
    </ScrollView>
  );
};
