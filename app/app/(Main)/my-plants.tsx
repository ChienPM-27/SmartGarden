import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Plant } from '@/components/Common/types';
import PlantDetailModal from '@/components/Plants/PlantDetailModal';
import NavigationBar from '@/components/Common/NavigationBar';
import StorageService from '@/components/services/storageService';

const MyPlantsScreen = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load plants from storage when component mounts
  useEffect(() => {
    loadStoredPlants();
  }, []);

  const loadStoredPlants = async () => {
    try {
      setIsLoading(true);
      const storedPlants = await StorageService.loadPlants();
      setPlants(storedPlants);
    } catch (error) {
      console.error('Error loading plants:', error);
      Alert.alert('Error', 'Failed to load plants');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenPlantDetail = (plant: Plant) => {
    setSelectedPlant(plant);
  };

  const handleClosePlantDetail = () => {
    setSelectedPlant(null);
  };

  const openEditModal = () => {
    // This function will be passed to PlantDetailModal
    // The actual editing logic is inside the PlantDetailModal component
  };

  const handleDeletePlant = async () => {
    if (!selectedPlant) return;
    
    try {
      // Remove from plants array
      const filteredPlants = plants.filter(p => p.id !== selectedPlant.id);
      
      // Update local state
      setPlants(filteredPlants);
      
      // Delete from storage
      await StorageService.deletePlant(selectedPlant.id);
      
      handleClosePlantDetail();
    } catch (error) {
      console.error('Error deleting plant:', error);
      Alert.alert('Error', 'Failed to delete plant');
    }
  };

  const handleSavePlant = async (updatedPlant: Plant) => {
    try {
      // Update plants array with edited plant
      const updatedPlants = plants.map(p => 
        p.id === updatedPlant.id ? updatedPlant : p
      );
      
      // Update local state
      setPlants(updatedPlants);
      
      // Update selected plant for detail view
      setSelectedPlant(updatedPlant);
      
      // Save to storage
      await StorageService.updatePlant(updatedPlant);
    } catch (error) {
      console.error('Error updating plant:', error);
      Alert.alert('Error', 'Failed to update plant');
    }
  };

  const updatePlantPhoto = async (photoUri: string) => {
    if (selectedPlant) {
      try {
        // Create updated plant with new photo
        const updatedPlant = { ...selectedPlant, photoUri };
        
        // Update selected plant
        setSelectedPlant(updatedPlant);
        
        // Update plants array
        const updatedPlants = plants.map(p => 
          p.id === selectedPlant.id ? updatedPlant : p
        );
        setPlants(updatedPlants);
        
        // Save to storage
        await StorageService.updatePlant(updatedPlant);
      } catch (error) {
        console.error('Error updating plant photo:', error);
        Alert.alert('Error', 'Failed to update plant photo');
      }
    }
  };

  const renderPlantItem = ({ item }: { item: Plant }) => (
    <TouchableOpacity 
      style={styles.plantItemContainer}
      onPress={() => handleOpenPlantDetail(item)}
    >
      <View style={styles.plantImageContainer}>
        {item.photoUri || item.imageUri ? (
          <Image
            source={{ uri: item.photoUri || item.imageUri }}
            style={styles.plantImage}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.plantPlaceholder}>
            <MaterialIcons name={item.icon} size={40} color="#4ADE80" />
          </View>
        )}
      </View>
      <View style={styles.plantInfo}>
        <Text style={styles.plantName}>{item.name}</Text>
        <Text style={styles.plantType}>{item.type}</Text>
        <Text style={styles.plantProgress}>{item.progress}</Text>
      </View>
      <MaterialIcons name="chevron-right" size={24} color="#10B981" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#166534" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Plants</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#10B981" />
        </View>
      ) : plants.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="eco" size={80} color="#A7F3D0" />
          <Text style={styles.emptyText}>No plants added yet</Text>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => router.push('/Home')}
          >
            <Text style={styles.addButtonText}>Add Your First Plant</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={plants}
          keyExtractor={(item) => item.id}
          renderItem={renderPlantItem}
          contentContainerStyle={styles.listContent}
        />
      )}

      <PlantDetailModal
        selectedPlant={selectedPlant}
        handleClosePlantDetail={handleClosePlantDetail}
        openEditModal={openEditModal}
        handleDeletePlant={handleDeletePlant}
        updatePlantPhoto={updatePlantPhoto}
        handleSavePlant={handleSavePlant}
      />

      <View style={styles.navigationBarContainer}>
        <NavigationBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCFCE7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#166534',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    color: '#166534',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#10B981',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  plantItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  plantImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    marginRight: 16,
  },
  plantImage: {
    width: '100%',
    height: '100%',
  },
  plantPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantInfo: {
    flex: 1,
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#166534',
    marginBottom: 4,
  },
  plantType: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  plantProgress: {
    fontSize: 12,
    color: '#10B981',
  },
  navigationBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default MyPlantsScreen;