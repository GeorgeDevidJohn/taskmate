import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface LoadingIndicatorProps {
  /**
   * Variant of the loading indicator
   * @default 'dots'
   */
  variant?: 'dots' | 'spinner' | 'pulse' | 'bars';
  /**
   * Size of the loading indicator
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Optional loading text to display below the indicator
   */
  text?: string;
  /**
   * Color of the loading indicator (uses theme color if not provided)
   */
  color?: string;
}

export function LoadingIndicator({ 
  variant = 'dots', 
  size = 'medium',
  text,
  color,
}: LoadingIndicatorProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const defaultColor = color || (isDark ? '#4A90E2' : '#0a7ea4');

  // Size configurations
  const sizes = {
    small: { dot: 8, spinner: 24, bar: 30 },
    medium: { dot: 12, spinner: 40, bar: 50 },
    large: { dot: 16, spinner: 60, bar: 70 },
  };

  const currentSize = sizes[size];

  if (variant === 'dots') {
    return <DotsIndicator size={currentSize.dot} color={defaultColor} text={text} />;
  }

  if (variant === 'spinner') {
    return <SpinnerIndicator size={currentSize.spinner} color={defaultColor} text={text} />;
  }

  if (variant === 'pulse') {
    return <PulseIndicator size={currentSize.dot} color={defaultColor} text={text} />;
  }

  if (variant === 'bars') {
    return <BarsIndicator size={currentSize.bar} color={defaultColor} text={text} />;
  }

  return null;
}

// Dots Indicator
function DotsIndicator({ size, color, text }: { size: number; color: string; text?: string }) {
  const dot1 = useSharedValue(1);
  const dot2 = useSharedValue(1);
  const dot3 = useSharedValue(1);

  useEffect(() => {
    dot1.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 600 }),
        withTiming(1, { duration: 600 })
      ),
      -1
    );

    dot2.value = withDelay(
      200,
      withRepeat(
        withSequence(
          withTiming(0.4, { duration: 600 }),
          withTiming(1, { duration: 600 })
        ),
        -1
      )
    );

    dot3.value = withDelay(
      400,
      withRepeat(
        withSequence(
          withTiming(0.4, { duration: 600 }),
          withTiming(1, { duration: 600 })
        ),
        -1
      )
    );

    return () => {
      cancelAnimation(dot1);
      cancelAnimation(dot2);
      cancelAnimation(dot3);
    };
  }, []);

  const dot1Style = useAnimatedStyle(() => ({
    opacity: dot1.value,
    transform: [{ scale: dot1.value }],
  }));

  const dot2Style = useAnimatedStyle(() => ({
    opacity: dot2.value,
    transform: [{ scale: dot2.value }],
  }));

  const dot3Style = useAnimatedStyle(() => ({
    opacity: dot3.value,
    transform: [{ scale: dot3.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.dotsContainer}>
        <Animated.View style={[styles.dot, dot1Style, { width: size, height: size, backgroundColor: color }]} />
        <Animated.View style={[styles.dot, dot2Style, { width: size, height: size, backgroundColor: color }]} />
        <Animated.View style={[styles.dot, dot3Style, { width: size, height: size, backgroundColor: color }]} />
      </View>
      {text && <ThemedText style={styles.text}>{text}</ThemedText>}
    </View>
  );
}

// Spinner Indicator
function SpinnerIndicator({ size, color, text }: { size: number; color: string; text?: string }) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 3000, easing: Easing.linear }),
      -1
    );

    return () => {
      cancelAnimation(rotation);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.spinner, animatedStyle, { width: size, height: size }]}>
        <View style={[
          styles.spinnerBorder,
          {
            width: size,
            height: size,
            borderColor: color,
            borderTopColor: 'transparent',
            borderWidth: size / 10,
          }
        ]} />
      </Animated.View>
      {text && <ThemedText style={styles.text}>{text}</ThemedText>}
    </View>
  );
}

// Pulse Indicator
function PulseIndicator({ size, color, text }: { size: number; color: string; text?: string }) {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  useEffect(() => {
    scale.value = withRepeat(
      withSequence(
        withTiming(1.5, { duration: 800, easing: Easing.ease }),
        withTiming(1, { duration: 800, easing: Easing.ease })
      ),
      -1
    );

    opacity.value = withRepeat(
      withSequence(
        withTiming(0.3, { duration: 800, easing: Easing.ease }),
        withTiming(1, { duration: 800, easing: Easing.ease })
      ),
      -1
    );

    return () => {
      cancelAnimation(scale);
      cancelAnimation(opacity);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[
        styles.pulse,
        animatedStyle,
        { width: size * 3, height: size * 3, backgroundColor: color }
      ]} />
      {text && <ThemedText style={styles.text}>{text}</ThemedText>}
    </View>
  );
}

// Bars Indicator
function BarsIndicator({ size, color, text }: { size: number; color: string; text?: string }) {
  const bar1 = useSharedValue(1);
  const bar2 = useSharedValue(1);
  const bar3 = useSharedValue(1);

  useEffect(() => {
    const animate = (value: Animated.SharedValue<number>, delay: number) => {
      value.value = withDelay(
        delay,
        withRepeat(
          withSequence(
            withTiming(0.4, { duration: 400 }),
            withTiming(1, { duration: 400 })
          ),
          -1
        )
      );
    };

    animate(bar1, 0);
    animate(bar2, 150);
    animate(bar3, 300);

    return () => {
      cancelAnimation(bar1);
      cancelAnimation(bar2);
      cancelAnimation(bar3);
    };
  }, []);

  const bar1Style = useAnimatedStyle(() => ({
    height: `${bar1.value * 100}%`,
  }));

  const bar2Style = useAnimatedStyle(() => ({
    height: `${bar2.value * 100}%`,
  }));

  const bar3Style = useAnimatedStyle(() => ({
    height: `${bar3.value * 100}%`,
  }));

  const barWidth = size / 6;

  return (
    <View style={styles.container}>
      <View style={[styles.barsContainer, { height: size }]}>
        <Animated.View style={[styles.bar, bar1Style, { width: barWidth, backgroundColor: color }]} />
        <Animated.View style={[styles.bar, bar2Style, { width: barWidth, backgroundColor: color }]} />
        <Animated.View style={[styles.bar, bar3Style, { width: barWidth, backgroundColor: color }]} />
      </View>
      {text && <ThemedText style={styles.text}>{text}</ThemedText>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  text: {
    fontSize: 14,
    opacity: 0.7,
  },
  // Dots styles
  dotsContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  dot: {
    borderRadius: 1000,
  },
  // Spinner styles
  spinner: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinnerBorder: {
    borderRadius: 1000,
  },
  // Pulse styles
  pulse: {
    borderRadius: 1000,
  },
  // Bars styles
  barsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
  },
  bar: {
    borderRadius: 4,
  },
});

