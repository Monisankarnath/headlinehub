import React, {useRef} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {INewsArticle} from 'api.types';
import {formatDate} from '../../utils';
import {altNewsImage, deleteBin, pin} from '../../assets';
import {THEME} from '../../theme';
import useAppStore from '../../store';
import ReanimatedSwipeable, {
  SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  FadeIn,
  FadeOut,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

type HeadLineCardProps = {
  item: INewsArticle;
};
type RightActionProps = {
  drag: SharedValue<number>;
  children: React.ReactNode;
};
const RightAction = ({drag, children}: RightActionProps) => {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{translateX: drag.value + 80}],
    };
  });

  return <Reanimated.View style={styleAnimation}>{children}</Reanimated.View>;
};
export const HeadLineCard: React.FC<HeadLineCardProps> = ({item}) => {
  const {setPinnedHeadlines} = useAppStore();
  const swipeableRow = useRef<SwipeableMethods>(null);
  const {title, author, publishedAt, source, urlToImage} = item;
  const time = formatDate(publishedAt);
  const closeSwipeable = () => {
    if (swipeableRow.current) {
      swipeableRow.current.close();
    }
  };
  const handlePin = (article: INewsArticle) => {
    closeSwipeable();
    setPinnedHeadlines({article});
  };
  const renderRightActions = (
    _: any,
    dragAnimatedValue: SharedValue<number>,
  ) => {
    return (
      <RightAction drag={dragAnimatedValue}>
        <View style={styles.swipeContainer}>
          <TouchableOpacity
            disabled={!item.isPinned}
            onPress={() => handlePin(item)}
            style={[
              styles.actionContainer,
              {opacity: item.isPinned ? 1 : 0.5},
            ]}>
            <Image
              source={deleteBin}
              resizeMode="contain"
              style={styles.actionImage}
            />
            <Text style={styles.actionText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={item.isPinned}
            onPress={() => handlePin(item)}
            style={[
              styles.actionContainer,
              {opacity: item.isPinned ? 0.5 : 1},
            ]}>
            <Image
              source={pin}
              resizeMode="contain"
              style={styles.actionImage}
            />
            <Text style={styles.actionText}>Pin</Text>
          </TouchableOpacity>
        </View>
      </RightAction>
    );
  };
  return (
    <ReanimatedSwipeable
      ref={swipeableRow}
      friction={2}
      leftThreshold={80}
      rightThreshold={40}
      renderRightActions={renderRightActions}>
      <Reanimated.View style={styles.card} entering={FadeIn} exiting={FadeOut}>
        <View style={styles.timeContainer}>
          <Text style={styles.sourceName}>{source.name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <View style={styles.mainContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
          </View>
          {urlToImage ? (
            <Image
              source={{uri: urlToImage}}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={altNewsImage}
              style={styles.image}
              resizeMode="cover"
            />
          )}
        </View>
        <Text style={styles.author}>{author}</Text>
      </Reanimated.View>
    </ReanimatedSwipeable>
  );
};
const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: THEME.colors.border,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sourceName: {color: THEME.colors.gray, fontSize: 14, fontWeight: '400'},
  time: {color: THEME.colors.black, fontSize: 16, fontWeight: '400'},
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  titleContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingRight: 20,
    flexShrink: 1,
  },
  title: {color: THEME.colors.black, fontSize: 18, fontWeight: '700'},
  author: {
    color: THEME.colors.gray,
    fontSize: 12,
    fontWeight: '500',
  },
  image: {height: 80, width: 80, borderRadius: 12},
  swipeContainer: {
    backgroundColor: THEME.colors.blue,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
    flexDirection: 'column',
    gap: 10,
    paddingVertical: 20,
    width: 80,
    alignItems: 'center',
  },
  actionContainer: {flexDirection: 'column', alignItems: 'center', gap: 4},
  actionImage: {width: 26, height: 26},
  actionText: {
    fontSize: 12,
    fontWeight: '400',
    color: THEME.colors.background,
  },
});
