import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AddPlantModal from '@/app/(Main)/MyPlants/Modal/AddPlantModal';
import { Plant } from '@/components/types/PlantTypes';
import StorageService from '@/components/services/storage/storageService';

type QuickActionButtonProps = {
  iconComponent: React.ReactNode;
  label: string;
  containerStyle?: object;
  onPress: () => void;
};

const QuickActionButton: React.FC<QuickActionButtonProps> = ({ iconComponent, label, containerStyle, onPress }) => {
  const animatedValue = useState(new Animated.Value(1))[0];

  const handlePressIn = () => {
    Animated.spring(animatedValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(animatedValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity 
      style={styles.quickActionButton}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
    >
      <Animated.View 
        style={[
          styles.iconContainer, 
          containerStyle,
          { transform: [{ scale: animatedValue }] }
        ]}
      >
        {iconComponent}
      </Animated.View>
      <Text style={styles.quickActionText}>{label}</Text>
    </TouchableOpacity>
  );
};

const QuickActions = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter(); // Using Expo Router for navigation

  const handleAddPlant = async (newPlantData: Omit<Plant, 'id'>) => {
    try {
      const newPlant: Plant = {
        ...newPlantData,
        id: Date.now().toString(),
      };

      const storedPlants = await StorageService.loadPlants();
      const updatedPlants = [...storedPlants, newPlant];
      await StorageService.savePlants(updatedPlants);

      setModalVisible(false);
      Alert.alert('Success', 'Plant added successfully!');
    } catch (error) {
      console.error('Error adding plant:', error);
      Alert.alert('Error', 'Failed to add plant');
    }
  };

  // Function to navigate to Scanner screen
  const navigateToScanner = () => {
    try {
      // Navigate to the Scanner component
      router.push('/Home/Scanner');
    } catch (error) {
      console.error('Error navigating to scanner:', error);
      Alert.alert('Error', 'Unable to open scanner');
    }
  };
  
  const navigateToNews = () => {
    try {
      // Navigate to the News component
      router.push('./News');
    } catch (error) {
      console.error('Error navigating to news:', error);
      Alert.alert('Error', 'Unable to open news');
    }
  }

  return (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      
      <View style={styles.quickActionButtonsRow}>
        {/* News Button */}
        <QuickActionButton 
          iconComponent={<Feather name="book" size={24} color="white" />}
          label="News"
          containerStyle={styles.newsIconContainer}
          onPress={navigateToNews}
        />

        {/* Add Plants Button */}
        <QuickActionButton 
          iconComponent={<Feather name="plus" size={24} color="white" />}
          label="Add plants"
          containerStyle={styles.addPlantsIconContainer}
          onPress={() => setModalVisible(true)}
        />

        {/* QR Scan Button */}
        <QuickActionButton 
          iconComponent={<MaterialCommunityIcons name="qrcode-scan" size={24} color="white" />}
          label="QR Scan"
          containerStyle={styles.qrScanIconContainer}
          onPress={navigateToScanner}
        />
      </View>
      
      {/* Content to fill remaining space */}
      <View style={styles.extendedSpaceContainer} />

      <AddPlantModal
        visible={modalVisible}
        handleCloseAddPlant={() => setModalVisible(false)}
        handleSaveNewPlant={handleAddPlant}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  quickActionsContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 10,
    paddingBottom: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 20,
    marginLeft: 10,
  },
  quickActionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionButton: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  newsIconContainer: {
    backgroundColor: '#7DD3FC',
  },
  addPlantsIconContainer: {
    backgroundColor: '#4ADE80',
  },
  qrScanIconContainer: {
    backgroundColor: '#12866A',
  },
  quickActionText: {
    fontSize: 16,
    color: '#065F46',
    fontWeight: '500',
  },
  extendedSpaceContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

export default QuickActions;