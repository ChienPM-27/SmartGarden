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
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.plantImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.plantInfoContainer}>
        <Text style={styles.plantName} numberOfLines={1} ellipsizeMode="tail">
          {name}
        </Text>
        <Text style={styles.plantStatus}>Last watered: {lastWatered}</Text>
        <Text style={styles.plantStatus}>Fertilize in: {fertilizeIn}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Feather name="chevron-right" size={20} color="#4CAF50" />
      </View>
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
    height: 100, // Fixed height for consistent sizing
  },
  imageContainer: {
    width: 70,
    height: 70,
    marginRight: 15,
    borderRadius: 10,
    overflow: 'hidden',
  },
  plantImage: {
    width: '100%',
    height: '100%',
  },
  plantInfoContainer: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  plantName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 5,
  },
  plantStatus: {
    fontSize: 14,
    color: '#047857',
    marginBottom: 2,
  },
  iconContainer: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlantItem;