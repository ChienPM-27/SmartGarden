// app/(Main)/Home/HomeScreen.tsx - Improved version
import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';

// Import our improved cross-platform components
import SafeAreaWrapper from '@/components/Common/SafeAreaWrapper';
import { UI, createShadow } from '@/components/Common/CrossPlatformUtils';

// Import existing components
import WeatherSection from './WeatherSection';
import ActionButtons from './ActionButtons';
import QuickActions from './QuickAction';
import MyPlants from './MyPlants';
import NavigationBar from '@/components/Common/NavigationBar';

const HomeScreen = () => {
  return (
    <SafeAreaWrapper 
      backgroundColor="#ECFDF5"
      statusBarColor="#7DD3FC"
      statusBarStyle="light-content"
    >
      <View style={styles.container}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={Platform.OS === 'ios'} // iOS bounce effect
          overScrollMode="never" // Better Android scroll behavior
        >
          <WeatherSection />
          <ActionButtons />
          <QuickActions />
          <MyPlants />
        </ScrollView>
        
        {/* Navigation bar with proper bottom safe area handling */}
        <View style={styles.navigationContainer}>
          <NavigationBar />
        </View>
      </View>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFDF5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'ios' ? 90 : 80, // Platform-specific padding
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    ...createShadow(5), // Cross-platform shadow
    borderTopLeftRadius: UI.borderRadius.medium,
    borderTopRightRadius: UI.borderRadius.medium,
  }
});

export default HomeScreen;