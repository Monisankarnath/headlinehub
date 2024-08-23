import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {THEME} from './src/theme';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={THEME.colors.background}
        />
        <ScrollView contentContainerStyle={styles.container}>
          <Text>HeadlineHub</Text>
        </ScrollView>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.background,
  },
});

export default App;
