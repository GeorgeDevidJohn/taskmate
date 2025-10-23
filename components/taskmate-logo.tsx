import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  withDelay,
  Easing,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface TaskMateLogoProps {
  /**
   * Animation delay in milliseconds before the animation starts
   * @default 0
   */
  delay?: number;
  /**
   * Size variant of the logo
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Whether to show the tagline
   * @default true
   */
  showTagline?: boolean;
}

export function TaskMateLogo({ 
  delay = 0, 
  size = 'medium', 
  showTagline = true 
}: TaskMateLogoProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // Animation values
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const taskOpacity = useSharedValue(0);
  const mateOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);
  const taglineTranslateY = useSharedValue(20);

  // Size configurations
  const sizes = {
    small: { logo: 40, title: 32, tagline: 12 },
    medium: { logo: 60, title: 48, tagline: 16 },
    large: { logo: 80, title: 64, tagline: 20 },
  };

  const currentSize = sizes[size];

  useEffect(() => {
    // Logo icon animation - scale in with bounce
    logoScale.value = withDelay(
      delay,
      withSpring(1, {
        damping: 8,
        stiffness: 100,
      })
    );
    
    logoOpacity.value = withDelay(
      delay,
      withTiming(1, { duration: 400 })
    );

    // "Task" text - fade in from left
    taskOpacity.value = withDelay(
      delay + 300,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) })
    );

    // "Mate" text - fade in from right
    mateOpacity.value = withDelay(
      delay + 500,
      withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) })
    );

    // Tagline - fade in and slide up
    if (showTagline) {
      taglineOpacity.value = withDelay(
        delay + 900,
        withTiming(1, { duration: 800, easing: Easing.out(Easing.ease) })
      );
      
      taglineTranslateY.value = withDelay(
        delay + 900,
        withSpring(0, {
          damping: 12,
          stiffness: 100,
        })
      );
    }
  }, [delay, showTagline]);

  // Animated styles
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const taskAnimatedStyle = useAnimatedStyle(() => ({
    opacity: taskOpacity.value,
    transform: [{ translateX: (1 - taskOpacity.value) * -20 }],
  }));

  const mateAnimatedStyle = useAnimatedStyle(() => ({
    opacity: mateOpacity.value,
    transform: [{ translateX: (1 - mateOpacity.value) * 20 }],
  }));

  const taglineAnimatedStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        {/* Logo Icon - Checkmark in Circle */}
        <Animated.View style={[styles.logoIcon, logoAnimatedStyle]}>
          <View style={[
            styles.iconCircle,
            { 
              width: currentSize.logo,
              height: currentSize.logo,
              backgroundColor: isDark ? '#4A90E2' : '#0a7ea4',
            }
          ]}>
            <View style={styles.checkmark}>
              <View style={[styles.checkmarkStem, { backgroundColor: '#fff' }]} />
              <View style={[styles.checkmarkKick, { backgroundColor: '#fff' }]} />
            </View>
          </View>
        </Animated.View>

        {/* Text Logo */}
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Animated.View style={taskAnimatedStyle}>
              <ThemedText 
                style={[
                  styles.taskText, 
                  { 
                    fontSize: currentSize.title,
                    color: isDark ? '#4A90E2' : '#0a7ea4',
                  }
                ]}
              >
                Task
              </ThemedText>
            </Animated.View>
            <Animated.View style={mateAnimatedStyle}>
              <ThemedText 
                style={[
                  styles.mateText,
                  { fontSize: currentSize.title }
                ]}
              >
                Mate
              </ThemedText>
            </Animated.View>
          </View>

          {/* Tagline */}
          {showTagline && (
            <Animated.View style={taglineAnimatedStyle}>
              <ThemedText 
                style={[
                  styles.tagline,
                  { 
                    fontSize: currentSize.tagline,
                    color: isDark ? '#9BA1A6' : '#687076',
                  }
                ]}
              >
                Neighbors Helping Neighbors
              </ThemedText>
            </Animated.View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  logoIcon: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  iconCircle: {
    borderRadius: 1000,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    position: 'relative',
    width: '50%',
    height: '50%',
  },
  checkmarkStem: {
    position: 'absolute',
    width: 3,
    height: '80%',
    bottom: '10%',
    right: '40%',
    transform: [{ rotate: '45deg' }],
    borderRadius: 2,
  },
  checkmarkKick: {
    position: 'absolute',
    width: '40%',
    height: 3,
    bottom: '10%',
    left: '10%',
    transform: [{ rotate: '-45deg' }],
    borderRadius: 2,
  },
  textContainer: {
    alignItems: 'flex-start',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    fontWeight: '700',
    letterSpacing: -1,
  },
  mateText: {
    fontWeight: '300',
    letterSpacing: -1,
  },
  tagline: {
    fontWeight: '400',
    fontStyle: 'italic',
    marginTop: 4,
    letterSpacing: 0.5,
  },
});

