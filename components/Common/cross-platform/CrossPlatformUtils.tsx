// components/Common/CrossPlatformUtils.tsx
import { Platform, StatusBar, Dimensions, StyleSheet } from 'react-native';

// Get screen dimensions
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT = Dimensions.get('window').height;

// Platform-specific values
export const IS_IOS = Platform.OS === 'ios';
export const IS_ANDROID = Platform.OS === 'android';

// Safe area insets based on platform
export const SAFE_AREA_TOP = IS_IOS ? 44 : StatusBar.currentHeight || 0;
export const SAFE_AREA_BOTTOM = IS_IOS ? 34 : 0;

// Standard UI dimensions
export const UI = {
  borderRadius: {
    small: 8,
    medium: 12,
    large: IS_IOS ? 22 : 20, // iOS typically has slightly larger rounded corners
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
    xxl: 28,
  },
};

// Cross-platform shadow utility
export const createShadow = (elevation = 2) => {
  return IS_IOS
    ? {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: elevation,
        },
        shadowOpacity: 0.1 + elevation * 0.03, // Adjusts opacity based on elevation
        shadowRadius: elevation * 0.8,
      }
    : {
        elevation,
      };
};

// Global styles that can be used across components
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: UI.borderRadius.medium,
    padding: UI.spacing.md,
    ...createShadow(3),
  },
  safeAreaTop: {
    paddingTop: SAFE_AREA_TOP,
  },
  safeAreaBottom: {
    paddingBottom: SAFE_AREA_BOTTOM,
  },
});

// Helper function to create a cross-platform pressable style
export const getPressableStyle = (pressed: boolean, backgroundColor = '#fff') => {
  return {
    opacity: pressed ? 0.9 : 1,
    backgroundColor,
    transform: [{ scale: pressed ? 0.98 : 1 }],
  };
};