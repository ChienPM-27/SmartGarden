import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Plant, initialPlantsData } from '@/components/types/PlantTypes';
import SearchBar from '@/app/(Main)/MyPlants/SearchBar';
import FilterModal from '@/app/(Main)/MyPlants/Modal/FilterModal';
import PlantDetailModal from '@/app/(Main)/MyPlants/PlantDetail/PlantDetailModal';
import NavigationBar from '@/components/Common/NavigationBar';
import PlantList from '@/app/(Main)/MyPlants/List/PlantList';
import AddPlantModal from '@/app/(Main)/MyPlants/Modal/AddPlantModal';
import StorageService from '@/components/services/storage/storageService';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

const images = {
  logo: require('@/assets/icons/logo.png'),
};

const SmartGardenHome = () => {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load plants from storage when component mounts
  useEffect(() => {
    const loadStoredPlants = async () => {
      try {
        setIsLoading(true);
        const storedPlants = await StorageService.loadPlants();
        
        // If no plants in storage, use initial data and save it
        if (storedPlants.length === 0) {
          setPlants(initialPlantsData);
          await StorageService.savePlants(initialPlantsData);
        } else {
          setPlants(storedPlants);
        }
      } catch (error) {
        console.error('Error loading plants:', error);
        Alert.alert('Error', 'Failed to load plants. Using default data.');
        setPlants(initialPlantsData);
      } finally {
        setIsLoading(false);
      }
    };

    loadStoredPlants();
  }, []);

  // Filter plants based on search text and filter criteria
  const filteredPlants = React.useMemo(() => {
    let filtered = plants;

    if (searchText) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (filterCriteria) {
      filtered = filtered.filter((p) =>
        p.description.toLowerCase().includes(filterCriteria.toLowerCase())
      );
    }

    return filtered;
  }, [plants, searchText, filterCriteria]);


  // Search handling
  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  // Filter handling
  const handleFilter = () => {
    setFilterVisible(false);
  };

  // Open plant detail modal
  const handleOpenPlantDetail = (plant: Plant) => {
    setSelectedPlant(plant);
  };

  // Close plant detail modal
  const handleClosePlantDetail = () => {
    setSelectedPlant(null);
  };

  // Open edit modal
  const openEditModal = () => {
    if (selectedPlant) {
      setEditingPlant(selectedPlant);
      setEditModalVisible(true);
    }
  };

  // Add new plant
  const handleAddPlant = async (newPlantData: Omit<Plant, 'id'>) => {
    try {
      // Generate a unique ID for the new plant
      const newPlant: Plant = {
        ...newPlantData,
        id: Date.now().toString(),
      };
      
      // Update local state
      const updatedPlants = [...plants, newPlant];
      setPlants(updatedPlants);
      
      // Save to storage
      await StorageService.savePlants(updatedPlants);
      
      setModalVisible(false);
    } catch (error) {
      console.error('Error adding plant:', error);
      Alert.alert('Error', 'Failed to add plant');
    }
  };

  // Save edited plant
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
      
      setEditingPlant(null);
    } catch (error) {
      console.error('Error updating plant:', error);
      Alert.alert('Error', 'Failed to update plant');
    }
  };

  // Delete plant
  const handleDeletePlant = async () => {
    if (!selectedPlant) return;
    
    try {
      // Remove from plants array
      const filteredPlants = plants.filter(p => p.id !== selectedPlant.id);
      
      // Update local state
      setPlants(filteredPlants);
      
      // Save to storage
      await StorageService.deletePlant(selectedPlant.id);
      
      handleClosePlantDetail();
    } catch (error) {
      console.error('Error deleting plant:', error);
      Alert.alert('Error', 'Failed to delete plant');
    }
  };

  // Update plant photo
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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#DCFCE7' }}>
      <StatusBar style="dark" />
      <View
        style={{
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 15,
        }}
      >
        {/* Logo and Welcome Text */}        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{
            width: 45,
            height: 45,
            borderRadius: 25,
            backgroundColor: 'white',
            marginRight: 12,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Image 
              source={images.logo} 
              style={{ 
                width: 35, 
                height: 35,
                borderRadius: 17.5,
              }} 
            />
          </View>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 28,
                color: '#166534',
                marginBottom: 2,
                textAlign: 'left',
              }}
            >
              Smart Garden
            </Text>
            <Text style={{ color: '#388e3c', fontSize: 15, fontWeight: '600' }}>
              Chào mừng trở lại!
            </Text>
          </View>
        </View>
        {/* Add Plant Button */}
      </View>

      <SearchBar
        searchText={searchText}
        handleSearch={handleSearch}
        setModalVisible={setModalVisible}
        setFilterVisible={setFilterVisible}
      />

      <PlantList
        plants={filteredPlants}
        handleOpenPlantDetail={handleOpenPlantDetail}
      />

      <FilterModal
        filterVisible={filterVisible}
        setFilterVisible={setFilterVisible}
        filterCriteria={filterCriteria}
        setFilterCriteria={setFilterCriteria}
        handleFilter={handleFilter}
      />

      <PlantDetailModal
        selectedPlant={selectedPlant}
        handleClosePlantDetail={handleClosePlantDetail}
        openEditModal={openEditModal}
        handleDeletePlant={handleDeletePlant}
        updatePlantPhoto={updatePlantPhoto}
        handleSavePlant={handleSavePlant}
      />

      <AddPlantModal
        visible={modalVisible}
        handleCloseAddPlant={() => setModalVisible(false)}
        handleSaveNewPlant={handleAddPlant}
      />

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <NavigationBar />
      </View>
    </SafeAreaView>
  );
};

export default SmartGardenHome;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#14532d',
    marginBottom: 12,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingVertical: 12,
    marginRight: 5,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#9CA3AF',
    borderRadius: 8,
    paddingVertical: 12,
    marginLeft: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});