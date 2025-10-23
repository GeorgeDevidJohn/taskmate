# TaskMate Animation Components

## Overview
This document describes the animated logo and loading indicator components created for the TaskMate app.

## Components

### 1. TaskMateLogo (`taskmate-logo.tsx`)

An animated logo component featuring the TaskMate branding with a checkmark icon and tagline.

#### Features
- **Smooth entrance animation** with scale and fade effects
- **Staggered text animation** - "Task" and "Mate" fade in sequentially
- **Tagline slide-up** - "Neighbors Helping Neighbors" slides up with fade
- **Responsive sizing** - Small, medium, and large variants
- **Theme-aware** - Adapts to light/dark mode
- **Configurable delay** - For sequential animations

#### Usage

```tsx
import { TaskMateLogo } from '@/components/taskmate-logo';

// Basic usage
<TaskMateLogo />

// With props
<TaskMateLogo 
  size="large"           // 'small' | 'medium' | 'large'
  showTagline={true}     // Show/hide tagline
  delay={500}           // Animation delay in ms
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size variant of the logo |
| `showTagline` | `boolean` | `true` | Whether to show the tagline |
| `delay` | `number` | `0` | Animation delay in milliseconds |

---

### 2. LoadingIndicator (`loading-indicator.tsx`)

A versatile loading indicator with multiple animation variants.

#### Features
- **4 animation variants**: dots, spinner, pulse, bars
- **3 size options**: small, medium, large
- **Optional loading text**
- **Custom colors** or theme-based colors
- **Smooth animations** using react-native-reanimated

#### Usage

```tsx
import { LoadingIndicator } from '@/components/loading-indicator';

// Dots variant (default)
<LoadingIndicator />

// With all options
<LoadingIndicator 
  variant="spinner"      // 'dots' | 'spinner' | 'pulse' | 'bars'
  size="large"          // 'small' | 'medium' | 'large'
  text="Loading..."     // Optional text below indicator
  color="#FF5733"       // Optional custom color
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'dots' \| 'spinner' \| 'pulse' \| 'bars'` | `'dots'` | Animation style |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the indicator |
| `text` | `string` | `undefined` | Optional text below indicator |
| `color` | `string` | theme color | Custom color for the indicator |

---

## Animation Details

### TaskMateLogo Animation Sequence
1. **Logo icon** (0ms): Scale in with spring bounce + fade in
2. **"Task" text** (+300ms): Fade in from left
3. **"Mate" text** (+500ms): Fade in from right
4. **Tagline** (+900ms): Fade in + slide up

### LoadingIndicator Variants

#### Dots
Three dots that fade and scale in sequence with a wave effect.

#### Spinner
Circular spinner that rotates continuously with a smooth linear motion.

#### Pulse
Single dot that scales up and fades in a breathing effect.

#### Bars
Three vertical bars that animate up and down in a wave pattern.

---

## Demo

The animations are showcased on the home screen (`app/(tabs)/index.tsx`), which displays:
- Hero logo with tagline
- All logo size variants
- All loading indicator variants
- Size comparisons

---

## Technical Details

### Dependencies
- `react-native-reanimated` (v4.1.1+) - For smooth 60fps animations
- Theme system from `@/constants/theme.ts`
- `useColorScheme` hook for dark/light mode

### Performance
- Uses `useSharedValue` and `useAnimatedStyle` for optimal performance
- All animations run on the UI thread (not JS thread)
- Properly cleanup animations on unmount to prevent memory leaks

---

## Future Enhancements
- Add success/error variants for LoadingIndicator
- Add haptic feedback option for logo animation
- Create skeleton loading variants
- Add custom animation timing configurations

---

**Created:** October 2025  
**Author:** TaskMate Development Team

