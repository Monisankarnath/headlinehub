import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {appLogo, refresh} from '../../assets';
import {THEME} from '../../theme';
import useAppStore from '../../store';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export const AppHeader: React.FC<AppHeaderProps> = ({loadNextHeadlines}) => {
  const {page, localPageNumber} = useAppStore();

  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{rotate: `${rotation.value}deg`}],
    };
  });

  const handlePress = () => {
    rotation.value = withTiming(rotation.value - 360, {
      duration: 1000,
    });
    loadNextHeadlines();
  };
  return (
    <View style={styles.container}>
      <Image source={appLogo} style={styles.image} resizeMode="cover" />
      <Text>
        {page} - {localPageNumber}
      </Text>
      <TouchableOpacity onPress={handlePress}>
        <Animated.Image
          source={refresh}
          resizeMode="contain"
          style={[styles.refreshImage, animatedStyle]}
        />
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: THEME.colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  image: {height: 40, width: 110},
  refreshImage: {height: 28, width: 28},
});
