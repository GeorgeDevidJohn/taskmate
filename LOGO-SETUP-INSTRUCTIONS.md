# TaskMate Logo Setup Instructions

## 📸 Logo Image Setup

I've updated the splash screen to use your actual TaskMate logo image. Here's what you need to do:

### 1. Add Your Logo Image

**File Location:** `taskmate/assets/images/taskmate-logo.png`

**Current Status:** Placeholder file exists - needs to be replaced with your actual logo

### 2. Logo Specifications

For optimal display, your logo should be:
- **Format:** PNG (preferred) or JPG
- **Dimensions:** Approximately **280x120 pixels**
- **Background:** White or transparent
- **Quality:** High resolution for crisp display

### 3. How to Add Your Logo

1. **Save your logo image** as `taskmate-logo.png`
2. **Replace the placeholder** at: `taskmate/assets/images/taskmate-logo.png`
3. **Run the app** to see your logo in action!

### 4. What's Already Set Up

✅ **Splash Screen Updated:**
- Uses `expo-image` for optimal image loading
- Logo scales from 0.8 to 1.1 (zoom animation)
- Fade-in effect on load
- Continuous zoom in/out animation
- Proper sizing and positioning

✅ **Animation Features:**
- Logo fades in smoothly
- Continuous zoom animation (0.9 to 1.1 scale)
- 3-second duration with progress bar
- Auto-navigation to onboarding

✅ **Styling:**
- White background
- Orange progress bar
- Centered logo positioning
- Responsive sizing

## 🎨 Logo Animation Preview

Your logo will:
1. **Fade in** when the splash screen loads
2. **Zoom in/out** continuously (breathing effect)
3. **Progress bar** fills up over 3 seconds
4. **Auto-navigate** to onboarding screens

## 🚀 Testing

Once you add your logo image:

```bash
npm start
```

You'll see:
- Your actual TaskMate logo with house icon and text
- Smooth zoom animation
- Orange progress bar
- Auto-navigation after 3 seconds

## 📁 File Structure

```
taskmate/
├── assets/
│   └── images/
│       └── taskmate-logo.jpg  ← Replace this with your logo
├── components/
│   └── splash-screen.tsx      ← Updated to use your logo
└── ...
```

---

**Status:** ✅ Code ready - Just add your logo image!  
**Next Step:** Replace the placeholder with your actual TaskMate logo

---

**Created:** October 2025  
**Ready for:** Logo image replacement
