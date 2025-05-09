import React from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
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
      <View className="flex-row items-center bg-white rounded-full px-3 py-2 mb-2">
        <MaterialIcons name="search" size={20} color="#6B7280" />
        <TextInput
          placeholder="Search plants"
          value={searchText}
          onChangeText={handleSearch}
          className="flex-1 ml-2 text-base text-gray-500"
          accessibilityLabel="Search plants input"
        />
        <TouchableOpacity
          className="ml-2 p-1 bg-green-600 rounded-full"
          onPress={() => setFilterVisible(true)}
          accessibilityLabel="Filter plants"
          accessibilityHint="Opens filter options modal"
        >
          <MaterialIcons name="filter-list" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="bg-green-600 rounded-full py-3 flex-row items-center justify-center mb-2"
        onPress={() => setModalVisible(true)}
        accessibilityLabel="Add new plant"
      >
        <MaterialIcons name="add" size={20} color="#FFFFFF" />
        <Text className="text-white font-bold ml-2">Add Plant</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
