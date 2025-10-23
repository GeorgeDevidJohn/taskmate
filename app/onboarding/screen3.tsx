import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import { ThemedText } from '@/components/themed-text';

export default function OnboardingScreen3() {
  return (
    <LinearGradient
      colors={['#ff6333', '#ff8c5a']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
        {/* Logo */}
     

        {/* Illustration/Icon */}
        <View style={styles.illustrationSection}>
         
            <Image
              source={require('@/assets/images/verified-profile-logo.png')}
              style={styles.verifiedLogo}
              contentFit="contain"
            />
        
        </View>

        {/* Content */}
        <View style={styles.textSection}>
          <ThemedText style={styles.title}>
            Build Trust & Community
          </ThemedText>
          <ThemedText style={styles.description}>
            Rate and review each other. No money exchanged — just neighbors helping neighbors.
          </ThemedText>
        </View>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={[styles.dot, styles.dotActive]} />
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonSection}>
          <Pressable 
            style={styles.nextButton}
            onPress={() => router.replace('/(tabs)')}
          >
            <ThemedText style={styles.nextButtonText}>Get Started</ThemedText>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
    paddingBottom: 40,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  illustrationSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  illustrationCircle: {
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  verifiedLogo: {
    width: 210,
    height: 210,
    borderRadius: 300,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 40,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  dotActive: {
    width: 24,
    backgroundColor: '#ffffff',
  },
  buttonSection: {
    gap: 16,
  },
  nextButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  nextButtonText: {
    color: '#ff6333',
    fontSize: 18,
    fontWeight: '600',
  },
});

