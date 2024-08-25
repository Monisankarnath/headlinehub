import React from 'react';
import {FlatList} from 'react-native';
import useAppStore from '../../store';
import {HeadLineCard} from './HeadlineCard';
import HeadlineSkeleton from './HeadlineSkeleton';
import {INewsArticle} from 'api.types';

export const Headlines: React.FC<{headlines: INewsArticle[]}> = ({
  headlines,
}) => {
  const {pinnedArticles} = useAppStore();
  const pinned = pinnedArticles.reverse();
  const recent = headlines.filter(article => !pinnedArticles.includes(article));
  const DATA = [...pinned, ...recent];
  return (
    <FlatList
      data={DATA}
      ListEmptyComponent={<HeadlineSkeleton />}
      keyExtractor={item => item.id}
      renderItem={({item}) => <HeadLineCard item={item} />}
    />
  );
};
