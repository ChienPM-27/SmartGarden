import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface PlantItemProps {
  name: string;
  lastWatered: string;
  fertilizeIn: string;
  image: string;
}

const PlantItem: React.FC<PlantItemProps> = ({ name, lastWatered, fertilizeIn, image }) => {
  return (
    <TouchableOpacity style={styles.plantItem}>
      <Image
        source={{ uri: image }}
        style={styles.plantImage}
      />
      <View style={styles.plantInfoContainer}>
        <Text style={styles.plantName}>{name}</Text>
        <Text style={styles.plantStatus}>Last watered: {lastWatered}</Text>
        <Text style={styles.plantStatus}>Fertilize in: {fertilizeIn}</Text>
      </View>
      <Feather name="chevron-right" size={20} color="#4CAF50" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  plantItem: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  plantImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  plantInfoContainer: {
    flex: 1,
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 3,
  },
  plantStatus: {
    fontSize: 14,
    color: '#047857',
  },
});

export default PlantItem;