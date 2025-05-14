import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';
import PlantItem from './PlantItem';
import { Plant } from '@/components/Common/types';
import StorageService from '@/components/services/storage/storageService';
import { router } from 'expo-router';

const MyPlants = () => {
  const [plantData, setPlantData] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load plants from storage when component mounts
  useEffect(() => {
    const loadPlants = async () => {
      try {
        setIsLoading(true);
        const storedPlants = await StorageService.loadPlants();
        // Only take the first 3 plants for the home screen preview
        const previewPlants = storedPlants.slice(0, 3);
        setPlantData(previewPlants);
      } catch (error) {
        console.error('Error loading plants for home screen:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPlants();
  }, []);

  const handleViewAll = () => {
    // Navigate to the My Plants screen
    router.push('/my-plants');
  };

  if (isLoading) {
    return (
      <View style={[styles.myPlantsContainer, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4ADE80" />
      </View>
    );
  }

  return (
    <View style={styles.myPlantsContainer}>
      <Text style={styles.sectionTitle}>My Plants</Text>

      {/* View All Button */}
      <TouchableOpacity style={styles.viewAllButton} onPress={handleViewAll}>
        <Text style={styles.viewAllText}>View All</Text>
        <Feather name="chevron-right" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Plant Items */}
      <View style={styles.plantItemsContainer}>
        {plantData.length > 0 ? (
          plantData.map(plant => (
            <PlantItem 
              key={plant.id} 
              name={plant.name}
              lastWatered={plant.waterStatus || 'Not set'}
              fertilizeIn={plant.progress || 'Not set'}
              image={plant.photoUri || plant.imageUri || '/api/placeholder/60/60'}
              // Can pass the full plant object if PlantItem component is updated to handle it
              // plant={plant}
            />
          ))
        ) : (
          <View style={styles.emptyStateContainer}>
            <MaterialIcons name="grass" size={40} color="#4ADE80" />
            <Text style={styles.emptyStateText}>No plants added yet</Text>
            <TouchableOpacity 
              style={styles.addPlantButton}
              onPress={handleViewAll}
            >
              <Text style={styles.addPlantButtonText}>Add Your First Plant</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myPlantsContainer: {
    
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  loadingContainer: {
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 15,
  },
  viewAllButton: {
    backgroundColor: '#4ADE80',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 15,
  },
  viewAllText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 5,
  },
  plantItemsContainer: {
    marginTop: 10,
  },
  emptyStateContainer: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#4B5563',
    marginTop: 10,
    marginBottom: 20,
  },
  addPlantButton: {
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  addPlantButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});

export default MyPlants;