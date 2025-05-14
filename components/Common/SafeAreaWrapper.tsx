import React, { ReactNode } from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Platform } from 'react-native';
import { IS_IOS, UI } from './CrossPlatformUtils';

interface SafeAreaWrapperProps {
  children: ReactNode;
  backgroundColor?: string;
  statusBarColor?: string;
  statusBarStyle?: 'light-content' | 'dark-content';
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}

/**
 * A wrapper component that provides safe area insets and proper status bar handling
 * across both iOS and Android platforms.
 */
const SafeAreaWrapper: React.FC<SafeAreaWrapperProps> = ({
  children,
  backgroundColor = '#FFFFFF',
  statusBarColor = '#FFFFFF',
  statusBarStyle = 'dark-content',
  edges = ['top', 'bottom', 'left', 'right'],
}) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={statusBarStyle}
        translucent={true}
      />
      <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
        {children}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    // On Android, we need to add padding to account for the status bar if it's translucent
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});

export default SafeAreaWrapper;