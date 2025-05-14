import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import PlantItem from './PlantItem';

const plantData = [
  {
    id: '1',
    name: 'Mint',
    lastWatered: '7h ago',
    fertilizeIn: '3 days',
    image: '/api/placeholder/60/60'
  },
  {
    id: '2',
    name: 'Lettuce',
    lastWatered: '7h ago',
    fertilizeIn: '3 days',
    image: '/api/placeholder/60/60'
  },
  {
    id: '3',
    name: 'Spinach',
    lastWatered: '1 day ago',
    fertilizeIn: '2 days',
    image: '/api/placeholder/60/60'
  }
];

const MyPlants = () => {
  return (
    <View style={styles.myPlantsContainer}>
      <Text style={styles.sectionTitle}>My Plants</Text>

      {/* View All Button */}
      <TouchableOpacity style={styles.viewAllButton}>
        <Text style={styles.viewAllText}>View All</Text>
        <Feather name="chevron-right" size={20} color="#fff" />
      </TouchableOpacity>

      {/* Plant Items */}
      <View style={styles.plantItemsContainer}>
        {plantData.map(plant => (
          <PlantItem 
            key={plant.id} 
            name={plant.name}
            lastWatered={plant.lastWatered}
            fertilizeIn={plant.fertilizeIn}
            image={plant.image}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  myPlantsContainer: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 20,
    paddingBottom: 20,
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
});

export default MyPlants;