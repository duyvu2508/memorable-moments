import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet } from 'react-native';

import { MemorableSection } from './src/components/MemorableSection';

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="dark" />
      <MemorableSection />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
