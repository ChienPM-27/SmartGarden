// components/services/storageService.ts
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Plant } from '../../Common/types';

const STORAGE_KEY = 'SMART_GARDEN_PLANTS';

/**
 * Service for handling local storage operations related to plants
 */
export const StorageService = {
  /**
   * Save all plants to AsyncStorage
   * @param plants Array of plants to save
   */
  savePlants: async (plants: Plant[]): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(plants);
      await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      console.log('Plants saved to storage successfully');
    } catch (error) {
      console.error('Error saving plants to storage:', error);
      throw error;
    }
  },

  /**
   * Load all plants from AsyncStorage
   * @returns Promise resolving to array of plants or empty array if none found
   */
  loadPlants: async (): Promise<Plant[]> => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      if (jsonValue !== null) {
        return JSON.parse(jsonValue) as Plant[];
      }
      console.log('No plants found in storage, returning empty array');
      return [];
    } catch (error) {
      console.error('Error loading plants from storage:', error);
      throw error;
    }
  },

  /**
   * Add a new plant to storage
   * @param plant Plant object to add
   */
  addPlant: async (plant: Plant): Promise<void> => {
    try {
      const currentPlants = await StorageService.loadPlants();
      currentPlants.push(plant);
      await StorageService.savePlants(currentPlants);
      console.log('Plant added to storage successfully');
    } catch (error) {
      console.error('Error adding plant to storage:', error);
      throw error;
    }
  },

  /**
   * Update an existing plant in storage
   * @param updatedPlant Updated plant object
   */
  updatePlant: async (updatedPlant: Plant): Promise<void> => {
    try {
      const currentPlants = await StorageService.loadPlants();
      const updatedPlants = currentPlants.map(plant => 
        plant.id === updatedPlant.id ? updatedPlant : plant
      );
      await StorageService.savePlants(updatedPlants);
      console.log('Plant updated in storage successfully');
    } catch (error) {
      console.error('Error updating plant in storage:', error);
      throw error;
    }
  },

  /**
   * Delete a plant from storage
   * @param plantId ID of the plant to delete
   */
  deletePlant: async (plantId: string): Promise<void> => {
    try {
      const currentPlants = await StorageService.loadPlants();
      const filteredPlants = currentPlants.filter(plant => plant.id !== plantId);
      await StorageService.savePlants(filteredPlants);
      console.log('Plant deleted from storage successfully');
    } catch (error) {
      console.error('Error deleting plant from storage:', error);
      throw error;
    }
  },

  /**
   * Clear all plants from storage
   */
  clearPlants: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      console.log('All plants cleared from storage');
    } catch (error) {
      console.error('Error clearing plants from storage:', error);
      throw error;
    }
  }
};

export default StorageService;