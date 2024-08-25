import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import useAppStore from '../../store';
import {THEME} from '../../theme';

const Skeleton: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.smallText} />
        <View style={styles.bigText} />
        <View style={styles.smallText} />
      </View>

      <View style={styles.rightContainer}>
        <View style={styles.image} />
      </View>
    </View>
  );
};
const HeadlineSkeleton: React.FC = () => {
  const {loading} = useAppStore();
  return (
    <View style={styles.empty}>
      {loading ? (
        <View>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </View>
      ) : (
        <Text style={styles.results}>0 results</Text>
      )}
    </View>
  );
};

export default HeadlineSkeleton;

const styles = StyleSheet.create({
  empty: {
    padding: 20,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  leftContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  smallText: {
    width: '40%',
    height: 10,
    backgroundColor: THEME.colors.border,
    borderRadius: 4,
    marginBottom: 6,
  },
  bigText: {
    width: '80%',
    height: 20,
    backgroundColor: THEME.colors.border,
    borderRadius: 4,
    marginBottom: 6,
  },
  rightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 16,
  },
  image: {
    width: 80,
    height: 80,
    backgroundColor: THEME.colors.border,
    borderRadius: 12,
  },
  results: {
    textAlign: 'center',
  },
});
