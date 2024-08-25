import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import useAppStore from './src/store';
import {THEME} from './src/theme';
import {AppHeader, Headlines} from './src/components';
import {useGetHeadlines} from './src/hooks';

function App(): React.JSX.Element {
  const {fetchHeadlines, setPinnedHeadlines} = useAppStore();
  const {currentHeadlines, loadNextHeadlines} = useGetHeadlines();
  React.useEffect(() => {
    fetchHeadlines();
    setPinnedHeadlines({article: null});
  }, [fetchHeadlines, setPinnedHeadlines]);
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={THEME.colors.background}
        />
        <View style={styles.container}>
          <AppHeader loadNextHeadlines={loadNextHeadlines} />
          <Headlines headlines={currentHeadlines} />
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
  activityContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
