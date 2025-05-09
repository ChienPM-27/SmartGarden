import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Plant, initialPlantsData } from '@/components/Home/types'; // Điều chỉnh đường dẫn
import SearchBar from '@/components/Home/SearchBar';
import AddPlantModal from '@/components/Home/AddPlantModal';
import FilterModal from '@/components/Home/FilterModal';
import PlantDetailModal from '@/components/Home/PlantDetailModal';
import EditPlantModal from '@/components/Home/EditPlantModal';
import NavigationBar from '@/components/NavigationBar';
import { MaterialIcons } from '@expo/vector-icons';

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


  // Thêm cây mới
  const handleAddPlant = () => {
    if (!newPlant.name.trim()) return alert('Vui lòng nhập tên cây');
    const newId = (plants.length + 1).toString();
    const plantToAdd = { ...newPlant, id: newId };
    setPlants([...plants, plantToAdd]);
    setNewPlant({
      id: '',
      name: '',
      description: '',
      icon: 'grass',
      type: '',
      progress: '',
      photoUri: undefined,
    });
    setModalVisible(false);
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
    setSelectedPlant(null);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#DCFCE7' }}>
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
        <View>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: '#166534' }}>Smart</Text>
          <Text style={{ fontWeight: 'bold', fontSize: 40, color: '#166534' }}>Garden</Text>
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

      <FlatList
        data={plants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 25,
              marginHorizontal: 16,
              marginVertical: 8,
              padding: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => handleOpenPlantDetail(item)}
            accessibilityLabel={`View details for ${item.name}`}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name={item.icon} size={24} color="#059669" />
              <View style={{ marginLeft: 16 }}>
                <Text style={{ color: '#166534', fontWeight: 'bold' }}>{item.name}</Text>
                <Text style={{ color: '#6B7280' }}>{item.description}</Text>
              </View>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#059669" />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <AddPlantModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        newPlant={newPlant}
        setNewPlant={setNewPlant}
        handleAddPlant={handleAddPlant}
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
      />

      <EditPlantModal
        editModalVisible={editModalVisible}
        setEditModalVisible={setEditModalVisible}
        editingPlant={editingPlant}
        setEditingPlant={setEditingPlant}
        handleSaveEdit={handleSaveEdit}
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
