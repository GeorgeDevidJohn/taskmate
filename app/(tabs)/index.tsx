import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { SplashScreen } from '@/components/splash-screen';
import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function HomeScreen() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
    router.push('/onboarding');
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} duration={4000} />;
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Welcome to TaskMate</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
