import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import AddPlantModal from '@/app/(Main)/MyPlants/Modal/AddPlantModal';
import { Plant } from '@/components/types/PlantTypes';
import StorageService from '@/components/services/storage/storageService';
import { Alert } from 'react-native';

const QuickActions = () => {
  const [modalVisible, setModalVisible] = useState(false);

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

  return (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      
      <View style={styles.quickActionButtonsRow}>
        {/* Water Button */}
        <TouchableOpacity style={styles.quickActionButton}>
          <View style={[styles.iconContainer, styles.waterIconContainer]}>
            <Feather name="droplet" size={24} color="white" />
          </View>
          <Text style={styles.quickActionText}>Water</Text>
        </TouchableOpacity>

        {/* Add Plants Button */}
        <TouchableOpacity style={styles.quickActionButton} onPress={() => setModalVisible(true)}>
          <View style={[styles.iconContainer, styles.addPlantsIconContainer]}>
            <Feather name="plus" size={24} color="white" />
          </View>
          <Text style={styles.quickActionText}>Add plants</Text>
        </TouchableOpacity>

        {/* Fertilize Button */}
        <TouchableOpacity style={styles.quickActionButton}>
          <View style={[styles.iconContainer, styles.fertilizeIconContainer]}>
            <MaterialCommunityIcons name="tree" size={24} color="white" />
          </View>
          <Text style={styles.quickActionText}>Fertilize</Text>
        </TouchableOpacity>
      </View>

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
    paddingTop: 0,
    paddingHorizontal: 20,
    marginTop: 10,
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
  waterIconContainer: {
    backgroundColor: '#7DD3FC',
  },
  addPlantsIconContainer: {
    backgroundColor: '#4ADE80',
  },
  fertilizeIconContainer: {
    backgroundColor: '#12866A',
  },
  quickActionText: {
    fontSize: 16,
    color: '#065F46',
    fontWeight: '500',
  },
});

export default QuickActions;
