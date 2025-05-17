import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Platform, Animated, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native';
import { UI, createShadow } from '@/components/Common/cross-platform/CrossPlatformUtils';
import { LinearGradient } from 'expo-linear-gradient';

import WeatherSection from './WeatherSection';
import ActionButtons from './ActionButtons';
import QuickActions from './QuickAction';
import MyPlants from './MyPlants';
import NavigationBar from '@/components/Common/NavigationBar';
import { StatusBar } from 'expo-status-bar';

const WEATHER_SECTION_HEIGHT = 150;
const NAVIGATION_HEIGHT = 70;

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [mintContainerHeight, setMintContainerHeight] = useState(0);
  const { height: screenHeight } = Dimensions.get('window');

  useEffect(() => {
    // Chiều cao còn lại = chiều cao màn hình - phần trên (WEATHER_SECTION_HEIGHT + 60) - thanh điều hướng - padding
    const remainingHeight = screenHeight - (WEATHER_SECTION_HEIGHT + 60) - NAVIGATION_HEIGHT;
    setMintContainerHeight(remainingHeight);
  }, [screenHeight]);

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

  // Giới hạn cuộn
  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true }
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#256dff' }}>  
      <StatusBar style="light"/>
      <View style={styles.container}>
        {/* Gradient chỉ áp dụng cho phần trên của màn hình */}
        <LinearGradient
          colors={['#256dff', '#75d2f9']}
          style={styles.backgroundGradient}
        />

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
          bounces={false} // Tắt bounce để tránh thấy nền
          overScrollMode="never"
          scrollEventThrottle={16}
          onScroll={handleScroll}
        >
          <View style={{ height: WEATHER_SECTION_HEIGHT + 60 }} />
          <View style={[
            styles.mintContainer,
            { minHeight: Math.max(mintContainerHeight, Platform.OS === 'ios' ? 500 : 450) }
          ]}>
            <QuickActions />
            <MyPlants />
          </View>
        </Animated.ScrollView>
      </View>

      <View style={styles.navigationContainer}>
        <NavigationBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: WEATHER_SECTION_HEIGHT + 100, // Chỉ cao đến đầu mintContainer
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
  },
  mintContainer: {
    flex: 1,
    backgroundColor: '#C1FCE3',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40, 
    paddingTop: 16,
    paddingBottom: 70,
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,  
    right: 0,
    zIndex: 20,
    backgroundColor: 'transparent',
    height: NAVIGATION_HEIGHT,
  },
});

export default HomeScreen;