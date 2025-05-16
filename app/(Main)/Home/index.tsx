import React, { useRef } from 'react';
import { View, StyleSheet, Platform, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native';
import { UI, createShadow } from '@/components/Common/cross-platform/CrossPlatformUtils';

import WeatherSection from './WeatherSection';
import ActionButtons from './ActionButtons';
import QuickActions from './QuickAction';
import MyPlants from './MyPlants';
import NavigationBar from '@/components/Common/NavigationBar';
import { StatusBar } from 'expo-status-bar';

const WEATHER_SECTION_HEIGHT = 150;

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;

  const weatherOpacity = scrollY.interpolate({
    inputRange: [0, WEATHER_SECTION_HEIGHT / 2, WEATHER_SECTION_HEIGHT],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  });

  const weatherTranslateY = scrollY.interpolate({
    inputRange: [0, WEATHER_SECTION_HEIGHT],
    outputRange: [0, -WEATHER_SECTION_HEIGHT],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#7DD3FC' }}>  
      <StatusBar style="auto"/>
      <LinearGradient
        colors={['#7DD3FC', '#38BDF8']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.container}>
          <Animated.View 
            style={[
              styles.weatherSectionContainer,
              { 
                opacity: weatherOpacity,
                transform: [{ translateY: weatherTranslateY }]
              }
            ]}
          >
            <WeatherSection />
            <ActionButtons />
          </Animated.View>

          <Animated.ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            bounces={Platform.OS === 'ios'} 
            overScrollMode="never"
            scrollEventThrottle={16}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: true }
            )}
          >
            <View style={{ height: WEATHER_SECTION_HEIGHT + 60 }} />
            <View style={styles.mintContainer}>
              <QuickActions />
              <MyPlants />
            </View>
          </Animated.ScrollView>
        </View>
      </LinearGradient>

      {/* Thanh Navigation Bar, nằm bên ngoài LinearGradient */}
      <View style={styles.navigationContainer}>
        <NavigationBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  weatherSectionContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Platform.OS === 'ios' ? 120 : 100, // Chỉnh lại padding để không bị trống
  },
  mintContainer: {
    flex: 1,
    backgroundColor: '#C1FCE3',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40, 
    paddingTop: 16,
    paddingBottom: 16,
  },
  navigationContainer: {
    position: 'absolute', // Chuyển về absolute
    bottom: 0,
    left: 0,
    right: 0,
    height: 70, // Cố định chiều cao của navigation
    ...createShadow(5),
    borderTopLeftRadius: UI.borderRadius.medium,
    borderTopRightRadius: UI.borderRadius.medium,
  },
});

export default HomeScreen;
