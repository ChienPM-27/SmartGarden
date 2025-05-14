import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';

// Import our improved cross-platform components
import SafeAreaWrapper from '@/components/Common/cross-platform/SafeAreaWrapper';
import { UI, createShadow } from '@/components/Common/cross-platform/CrossPlatformUtils';

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
          bounces={Platform.OS === 'ios'} 
          overScrollMode="never"
        >
          <WeatherSection />
          <ActionButtons />
          
          <View style={styles.mintContainer}>
            <QuickActions />
            <MyPlants />
          </View>

        </ScrollView>
        
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
    paddingBottom: Platform.OS === 'ios' ? 90 : 80,
  },
  mintContainer: {
    flex: 1,
    backgroundColor: '#C1FCE3',
    marginTop: 12,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40, 
    paddingTop: 16,
    paddingBottom: 16,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: -34,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    ...createShadow(5),
    borderTopLeftRadius: UI.borderRadius.medium,
    borderTopRightRadius: UI.borderRadius.medium,
  }
});

export default HomeScreen;
""
