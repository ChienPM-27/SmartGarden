import React from 'react';
import { View, StyleSheet, ScrollView, StatusBar } from 'react-native';

import WeatherSection from './WeatherSection';
import ActionButtons from './ActionButtons';
import QuickActions from './QuickAction';
import MyPlants from './MyPlants';
import NavigationBar from '@/components/Common/NavigationBar';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#7DD3FC" barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <WeatherSection />
        <ActionButtons />
        <QuickActions />
        <MyPlants />
      </ScrollView>
      <NavigationBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECFDF5',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 70, // Add padding for the navigation bar
  },
});

export default HomeScreen;