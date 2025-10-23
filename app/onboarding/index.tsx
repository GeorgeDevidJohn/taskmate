import React, { useState } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { ThemedText } from '@/components/themed-text';

const steps = [
  {
    id: 1,
    title: 'Welcome to Your Community',
    description: 'Connect with neighbors in your postal code to request and offer help for everyday tasks.',
    image: require('@/assets/images/family-logo.png'),
    imageSize: 320,
  },
  {
    id: 2,
    title: 'Hyper-Local Help',
    description: 'Find helpers nearby or offer your skills. Everything is based on trust and community spirit.',
    image: require('@/assets/images/step-logo.png'),
    imageSize: 360,
  },
  {
    id: 3,
    title: 'Build Trust & Community',
    description: 'Rate and review each other. No money exchanged — just neighbors helping neighbors.',
    image: require('@/assets/images/verified-profile-logo.png'),
    imageSize: 350,
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Animation values
  const contentOpacity = useSharedValue(1);
  const contentTranslateY = useSharedValue(0);
  const imageScale = useSharedValue(1);
  const imageOpacity = useSharedValue(1);

  const nextStep = () => {
    if (currentStep < steps.length - 1 && !isAnimating) {
      animateTransition(() => {
        setCurrentStep(currentStep + 1);
      });
    } else if (currentStep === steps.length - 1) {
      router.push('/login');
    }
  };

  const skipOnboarding = () => {
    router.push('/login');
  };

  const animateTransition = (callback: () => void) => {
    setIsAnimating(true);
    
    // Exit animation
    contentOpacity.value = withTiming(0, { duration: 300 });
    contentTranslateY.value = withTiming(-50, { duration: 300 });
    imageScale.value = withTiming(0.8, { duration: 300 });
    imageOpacity.value = withTiming(0, { duration: 300 });

    setTimeout(() => {
      callback();
      
      // Reset values for next step
      contentOpacity.value = 0;
      contentTranslateY.value = 50;
      imageScale.value = 0.8;
      imageOpacity.value = 0;

      // Enter animation
      setTimeout(() => {
        contentOpacity.value = withTiming(1, { duration: 400, easing: Easing.out(Easing.ease) });
        contentTranslateY.value = withSpring(0, { damping: 15, stiffness: 150 });
        imageScale.value = withSpring(1, { damping: 12, stiffness: 100 });
        imageOpacity.value = withTiming(1, { duration: 400 });
        
        setTimeout(() => setIsAnimating(false), 400);
      }, 100);
    }, 300);
  };

  const currentStepData = steps[currentStep];

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
   
  }));

  const imageAnimatedStyle = useAnimatedStyle(() => ({
    opacity: imageOpacity.value,
   
  }));

  return (
    <LinearGradient
      colors={['#ff6333', '#ff8c5a']}
      style={styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.content}>
        {/* Logo */}
   
        {/* Animated Content */}
        <View style={styles.illustrationSection}>
          <Animated.View style={imageAnimatedStyle}>
            <View style={{
            
            }}>
              <Image
                source={currentStepData.image}
                style={{
                  width: currentStepData.imageSize,
                  height: currentStepData.imageSize,
                }}
                contentFit="contain"
              />
            </View>
          </Animated.View>
        </View>

        <Animated.View style={[styles.textSection, contentAnimatedStyle]}>
          <ThemedText style={styles.title}>
            {currentStepData.title}
          </ThemedText>
          <ThemedText style={styles.description}>
            {currentStepData.description}
          </ThemedText>
        </Animated.View>

        {/* Pagination Dots */}
        <View style={styles.pagination}>
          {steps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === currentStep && styles.dotActive
              ]}
            />
          ))}
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonSection}>
          <Pressable 
            style={styles.nextButton}
            onPress={nextStep}
            disabled={isAnimating}
          >
            <ThemedText style={styles.nextButtonText}>
              {currentStep === steps.length - 1 ? 'Get Started' : 'Next'}
            </ThemedText>
          </Pressable>

          <Pressable 
            style={styles.skipButton}
            onPress={skipOnboarding}
          >
            <ThemedText style={styles.skipButtonText}>Skip</ThemedText>
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
  illustrationSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
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
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
});
