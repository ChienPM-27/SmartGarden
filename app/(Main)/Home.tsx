import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useFonts } from 'expo-font';
import { Plant, initialPlantsData } from '@/components/Common/types';
import SearchBar from '@/components/Plants/SearchBar';
import FilterModal from '@/components/Plants/FilterModal';
import PlantDetailModal from '@/components/Plants/PlantDetailModal';
import NavigationBar from '@/components/Common/NavigationBar';
import PlantList from '@/components/Plants/PlantList';
import AddPlantModal from '@/components/Plants/AddPlantModal';
import { router } from 'expo-router';

const images = {
  logo: require('@/assets/icons/logo.png'), // Cập nhật đường dẫn đúng đến logo của bạn
};

const SmartGardenHome = () => {
  
  const [plants, setPlants] = useState<Plant[]>(initialPlantsData);
  const [searchText, setSearchText] = useState('');
  const [filterCriteria, setFilterCriteria] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | null>(null);

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

  const handleNavigateProfile = () => {
        router.push('./profile');
    };


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
  const handleSavePlant = (updatedPlant: Plant) => {
    // Cập nhật danh sách cây với thông tin đã chỉnh sửa
    setPlants(plants.map((p) => (p.id === updatedPlant.id ? updatedPlant : p)));
    
    // Cập nhật cây đang chọn để hiển thị thông tin mới trong modal chi tiết
    setSelectedPlant(updatedPlant);
    
    // Cập nhật cây đang chỉnh sửa
    setEditingPlant(null);
  };

  // Xóa cây
  const handleDeletePlant = () => {
    if (!selectedPlant) return;
    setPlants(plants.filter((p) => p.id !== selectedPlant.id));
    handleClosePlantDetail();
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
        paddingHorizontal: 20,  // Thêm khoảng cách trái/phải cho thoáng
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
      }}
    >
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 35,
          color: '#166534',
          flex: 1,
          marginLeft: 5,
        }}
      >
        Smart Garden
      </Text>
      <Pressable
        onPress={handleNavigateProfile}
        accessible
        accessibilityLabel="Logo"
        style={{
          width: 45,  // Kích thước vừa phải để nhìn đẹp mắt
          height: 45,
          backgroundColor: 'white',
          borderRadius: 30,  // Tạo hình tròn hoàn hảo
          justifyContent: 'center',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        }}
      >
        <Image
          source={images.logo}  // Sử dụng logo của bạn
          style={{ width: 30, height: 30 }}  // Điều chỉnh kích thước logo
        />
      </Pressable>
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
        handleSavePlant={handleSavePlant}
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