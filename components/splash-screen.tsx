import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  cancelAnimation,
  Easing,
} from 'react-native-reanimated';

interface SplashScreenProps {
  /**
   * Callback when loading is complete
   */
  onComplete?: () => void;
  /**
   * Duration in milliseconds before calling onComplete
   * @default 4000
   */
  duration?: number;
}

export function SplashScreen({ onComplete, duration = 4000 }: SplashScreenProps) {
  const logoScale = useSharedValue(0.8);
  const logoOpacity = useSharedValue(0);
  const progressWidth = useSharedValue(0);

  useEffect(() => {
    // Logo fade in and zoom animation
    logoOpacity.value = withTiming(1, { duration: 500 });
    
    logoScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.9, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1,
      true
    );

    // Progress bar animation
    progressWidth.value = withTiming(100, {
      duration: duration,
      easing: Easing.linear,
    });

    // Navigate after duration
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, duration);

    return () => {
      clearTimeout(timer);
      cancelAnimation(logoScale);
      cancelAnimation(logoOpacity);
      cancelAnimation(progressWidth);
    };
  }, [duration, onComplete]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const progressAnimatedStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  return (
    <View style={styles.container}>
      {/* Animated Logo */}
      <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
        <Image
          source={require('@/assets/images/taskmate-logo.jpg')}
          style={styles.logoImage}
          contentFit="contain"
        />
      </Animated.View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBackground}>
          <Animated.View style={[styles.progressBarFill, progressAnimatedStyle]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    marginBottom: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 280,
    height: 120,
  },
  progressContainer: {
    position: 'absolute',
    bottom: 80,
    width: '70%',
  },
  progressBarBackground: {
    height: 4,
    backgroundColor: 'rgba(255, 99, 51, 0.2)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#ff6333',
    borderRadius: 2,
  },
});

