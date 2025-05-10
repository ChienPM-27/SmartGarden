import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Plant, initialPlantsData } from '@/components/Common/types';
import SearchBar from '@/components/Plants/SearchBar';
import FilterModal from '@/components/Plants/FilterModal';
import PlantDetailModal from '@/components/Plants/PlantDetailModal';
import NavigationBar from '@/components/Common/NavigationBar';
import { MaterialIcons } from '@expo/vector-icons';
import PlantList from '@/components/Plants/PlantList';

const SmartGardenHome = () => {
  const [plants, setPlants] = useState<Plant[]>(initialPlantsData);
  const [searchText, setSearchText] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);
  const [newPlant, setNewPlant] = useState<Plant>({
    id: '',
    name: '',
    description: '',
    icon: 'grass',
    type: '',
    progress: '',
    photoUri: undefined,
  });

  // Cập nhật danh sách cây theo tìm kiếm và lọc mỗi khi searchText hoặc filterCriteria thay đổi
  useEffect(() => {
    let filtered = initialPlantsData;

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

    setPlants(filtered);
  }, [searchText, filterCriteria]);

  // Hàm tìm kiếm (cập nhật searchText)
  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  // Hàm lọc (cập nhật filterCriteria)
  const handleFilter = () => {
    setFilterVisible(false);
  };

  // Mở modal chi tiết cây
  const handleOpenPlantDetail = (plant: Plant) => {
    setSelectedPlant(plant);
  };

  // Đóng modal chi tiết
  const handleClosePlantDetail = () => {
  setSelectedPlant(null);
  };

  // Mở modal chỉnh sửa
  const openEditModal = () => {
    if (selectedPlant) {
      setEditingPlant(selectedPlant);
      setEditModalVisible(true);
    }
  };

  // Lưu chỉnh sửa cây
  const handleSaveEdit = () => {
    if (!editingPlant?.name.trim()) {
      alert('Vui lòng nhập tên cây');
      return;
    }
    setPlants(plants.map((p) => (p.id === editingPlant?.id ? editingPlant : p)));
    setSelectedPlant(editingPlant);
    setEditModalVisible(false);
  };

  // Xóa cây
  const handleDeletePlant = () => {
    if (!selectedPlant) return;
      setPlants(plants.filter((p) => p.id !== selectedPlant.id));
      handleClosePlantDetail(); // Sử dụng hàm đóng modal mới
  };

  // Hàm cập nhật ảnh cây trồng
  const updatePlantPhoto = (photoUri: string) => {
    if (selectedPlant) {
      const updatedPlant = { ...selectedPlant, photoUri };
      setSelectedPlant(updatedPlant);
      setPlants(plants.map((p) => (p.id === selectedPlant.id ? updatedPlant : p)));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#DCFCE7' }}>
      <View
        style={{
          padding: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: '#166534' }}>
            Smart
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: '#166534' }}>
            Garden
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            right: 8,
            top: 16,
            width: 60,
            height: 60,
            backgroundColor: '#FFFFFF',
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          accessible={true}
          accessibilityLabel="Star icon"
        >
          <Text style={{ fontSize: 40 }}>🌟</Text>
        </View>
      </View>

      <SearchBar
        searchText={searchText}
        handleSearch={handleSearch}
        setModalVisible={setModalVisible}
        setFilterVisible={setFilterVisible}
      />

      <PlantList
        plants={plants}
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
