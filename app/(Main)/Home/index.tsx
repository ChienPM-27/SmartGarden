import React from 'react';
import { View, StyleSheet, ScrollView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Import our improved cross-platform components
import SafeAreaWrapper from '@/components/Common/cross-platform/SafeAreaWrapper';
import { UI, createShadow } from '@/components/Common/cross-platform/CrossPlatformUtils';

// Import existing components
import WeatherSection from './WeatherSection';
import ActionButtons from './ActionButtons';
import QuickActions from './QuickAction';
import MyPlants from './MyPlants';
import NavigationBar from '@/components/Common/NavigationBar';
import { StatusBar } from 'expo-status-bar';

const HomeScreen = () => {
  return (
    <SafeAreaWrapper >  
      <LinearGradient
        colors={['#7DD3FC', '#38BDF8']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
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
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
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