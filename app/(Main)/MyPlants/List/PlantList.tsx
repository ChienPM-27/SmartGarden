import React from 'react';
import { FlatList } from 'react-native';
import { Plant } from '@/components/types/PlantTypes';
import PlantCard from './PlantCard';

interface PlantListProps {
  plants: Plant[];
  handleOpenPlantDetail: (plant: Plant) => void;
}

const PlantList: React.FC<PlantListProps> = ({ plants, handleOpenPlantDetail }) => {
  return (
    <FlatList
      data={plants}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlantCard plant={item} handleOpenPlantDetail={handleOpenPlantDetail} />
      )}
      contentContainerStyle={{ paddingBottom: 100 }}
    />
  );
};

export default PlantList;
