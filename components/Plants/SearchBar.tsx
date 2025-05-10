import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchBarProps {
  searchText: string;
  handleSearch: (text: string) => void;
  setModalVisible: (visible: boolean) => void;
  setFilterVisible: (visible: boolean) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchText,
  handleSearch,
  setModalVisible,
  setFilterVisible,
}) => {
  return (
    <View className="px-4 mb-4">
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#6B7280" />
        <TextInput
          placeholder="Search plants"
          value={searchText}
          onChangeText={handleSearch}
          style={styles.input}
          accessibilityLabel="Search plants input"
        />
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterVisible(true)}
          accessibilityLabel="Filter plants"
          accessibilityHint="Opens filter options modal"
        >
          <MaterialIcons name="filter-list" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Add new plant"
      >
        <MaterialIcons name="add" size={24} color="#FFFFFF" />
        <Text style={styles.addButtonText}>Add Plant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,  // Bo góc mượt mà hơn
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 6,  // Giảm khoảng cách dưới của search bar
    shadowColor: '#000',  // Đổ bóng cho input
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,  // Bóng đổ cho Android
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#4B5563', // Màu chữ tối hơn một chút
    paddingVertical: 0,
  },
  filterButton: {
    marginLeft: 12,
    padding: 10,
    backgroundColor: '#10B981', // Màu nền của nút
    borderRadius: 50,
    shadowColor: '#000',  // Bóng đổ
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,  // Bóng đổ cho Android
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 28, // Bo góc to hơn
    paddingVertical: 14, // Tăng chiều cao
    marginBottom: -5,
    marginTop: 6,  // Giảm khoảng cách giữa search bar và add button
    shadowColor: '#000',  // Bóng đổ nhẹ
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,  // Bóng đổ cho Android
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,  // Tăng kích thước chữ
    marginLeft: 8,
  },
});

export default SearchBar;
