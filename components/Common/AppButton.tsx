// components/Common/AppButton.tsx
import React from 'react';
import { 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  TouchableNativeFeedback,
  View,
  Platform,
} from 'react-native';
import { UI, IS_ANDROID, IS_IOS, createShadow } from './CrossPlatformUtils';

interface AppButtonProps {
  title: string;
  onPress: () => void;
  type?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
  fullWidth?: boolean;
  style?: any;
  textStyle?: any;
}

/**
 * A cross-platform button component that handles ripple effects properly on Android
 * and opacity changes on iOS.
 */
const AppButton: React.FC<AppButtonProps> = ({
  title,
  onPress,
  type = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
  style,
  textStyle,
}) => {
  // Determine button styling based on type
  const buttonColors = {
    primary: {
      background: '#22C55E',
      text: '#FFFFFF',
    },
    secondary: {
      background: '#4F46E5',
      text: '#FFFFFF',
    },
    outline: {
      background: 'transparent',
      text: '#22C55E',
      borderColor: '#22C55E',
      borderWidth: 1,
    },
    danger: {
      background: '#EF4444',
      text: '#FFFFFF',
    },
  };

  // Determine button size
  const buttonSize = {
    small: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      fontSize: UI.fontSize.sm,
      borderRadius: UI.borderRadius.small,
    },
    medium: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      fontSize: UI.fontSize.md,
      borderRadius: UI.borderRadius.medium,
    },
    large: {
      paddingVertical: 16,
      paddingHorizontal: 24,
      fontSize: UI.fontSize.lg,
      borderRadius: UI.borderRadius.medium,
    },
  };

  const buttonStyle = {
    ...buttonColors[type],
    ...buttonSize[size],
  };

  // Helper to get the right container style
  const getContainerStyle = () => {
    return [
      styles.button,
      {
        backgroundColor: buttonStyle.background,
        borderRadius: buttonStyle.borderRadius,
        paddingVertical: buttonStyle.paddingVertical,
        paddingHorizontal: buttonStyle.paddingHorizontal,
        borderColor: (buttonStyle as any).borderColor,
        borderWidth: (buttonStyle as any).borderWidth,
        opacity: disabled ? 0.6 : 1,
        width: fullWidth ? '100%' : undefined,
      },
      IS_IOS && createShadow(2),
      style,
    ];
  };

  // Content to show inside the button
  const buttonContent = (
    <>
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={type === 'outline' ? buttonColors[type].text : '#FFFFFF'} 
        />
      ) : (
        <View style={styles.contentContainer}>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text
            style={[
              styles.text,
              {
                color: buttonStyle.text,
                fontSize: buttonStyle.fontSize,
                marginLeft: icon ? 8 : 0,
              },
              textStyle,
            ]}
          >
            {title}
          </Text>
        </View>
      )}
    </>
  );

  // Use the appropriate touchable component based on platform
  if (IS_ANDROID) {
    return (
      <View style={[getContainerStyle(), { overflow: 'hidden' }]}>
        <TouchableNativeFeedback
          onPress={onPress}
          disabled={disabled || loading}
          background={TouchableNativeFeedback.Ripple(
            type === 'outline' ? buttonColors[type].text : '#FFFFFF33',
            false
          )}
          useForeground={true}
        >
          <View style={styles.touchableContainer}>
            {buttonContent}
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      disabled={disabled || loading}
      style={getContainerStyle()}
    >
      {buttonContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: IS_ANDROID ? 2 : 0,
  },
  touchableContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: '600',
    textAlign: 'center',
  },
  iconContainer: {
    marginRight: 8,
  }
});

export default AppButton;