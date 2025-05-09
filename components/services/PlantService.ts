// components/services/PlantService.ts
import axios from 'axios';

const BASE_URL = 'https://your-api-url.com/api/plants';

export const getPlants = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching plants:', error);
    throw error;
  }
};

export const addPlant = async (plantData: any) => {
  try {
    const response = await axios.post(BASE_URL, plantData);
    return response.data;
  } catch (error) {
    console.error('Error adding plant:', error);
    throw error;
  }
};

export const updatePlant = async (id: string, plantData: any) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, plantData);
    return response.data;
  } catch (error) {
    console.error('Error updating plant:', error);
    throw error;
  }
};

export const deletePlant = async (id: string) => {
  try {
    await axios.delete(`${BASE_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting plant:', error);
    throw error;
  }
};
