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
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 8,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#6B7280',
  },
  filterButton: {
    marginLeft: 8,
    padding: 6,
    backgroundColor: '#10B981',
    borderRadius: 50,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#10B981',
    borderRadius: 28,       // Bo góc to hơn
    paddingVertical: 14,    // Tăng chiều cao
    marginBottom: -10,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,           // Tăng kích thước chữ
    marginLeft: 8,
  },
});
export default SearchBar;
