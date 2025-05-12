import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Plant } from '@/components/Common/types';

interface PlantCardProps {
  plant: Plant;
  handleOpenPlantDetail: (plant: Plant) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, handleOpenPlantDetail }) => {
  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handleOpenPlantDetail(plant)}
    >
      {/* Hình ảnh cây */}
      {plant.photoUri || plant.imageUri ? (
        <Image
          source={{ uri: plant.photoUri || plant.imageUri }}
          style={styles.plantImage}
          resizeMode="cover" // Lấp đầy toàn bộ khung ảnh
        />
      ) : (
        <View style={styles.noImageContainer}>
          <MaterialIcons name={plant.icon} size={30} color="#4ADE80" />
        </View>
      )}

      {/* Thông tin cây */}
      <View style={styles.infoContainer}>
        <View style={styles.row}>
          <Text style={styles.label}>🌿 Tên cây:</Text>
          <Text style={styles.value}>{plant.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>🔬 Tên khoa học:</Text>
          <Text style={styles.value}>{plant.scientificName || 'N/A'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>💧 Tưới nước:</Text>
          <Text style={styles.value}>{plant.waterStatus || 'Chưa cập nhật'}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>🌡️ Nhiệt độ:</Text>
          <Text style={styles.value}>{plant.temperature || 'Chưa cập nhật'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 2,
  },
  plantImage: {
    width: '100%',
    height: 200, // Tăng chiều cao cho cân đối hơn
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  noImageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 5,
    left: 20,
    right: 20,
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  label: {
    color: '#065F46',
    fontWeight: '500',
    fontSize: 12,
  },
  value: {
    color: '#14532D',
    fontWeight: '400',
    fontSize: 12,
  },
});

export default PlantCard;
