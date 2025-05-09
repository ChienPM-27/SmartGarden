import React from 'react';
import { Modal, View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';

interface FilterModalProps {
    filterVisible: boolean;
    setFilterVisible: (visible: boolean) => void;
    filterCriteria: string;
    setFilterCriteria: (criteria: string) => void;
    handleFilter: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
    filterVisible,
    setFilterVisible,
    filterCriteria,
    setFilterCriteria,
    handleFilter,
}) => {
    return (
        <Modal visible={filterVisible} animationType="slide" transparent onRequestClose={() => setFilterVisible(false)}>
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <ScrollView className="bg-white rounded-2xl w-5/6 p-6">
                    <Text className="text-xl font-bold text-green-900 mb-4">Filter Plants</Text>
                    <TextInput
                        placeholder="Filter by Description"
                        value={filterCriteria}
                        onChangeText={setFilterCriteria}
                        className="border border-gray-300 rounded-lg p-3 mb-4"
                        accessibilityLabel="Input filter criteria"
                    />
                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            className="bg-green-600 py-3 rounded-lg flex-1 mr-2"
                            onPress={handleFilter}
                            accessibilityLabel="Apply filter"
                        >
                            <Text className="text-center text-white font-bold">Apply Filter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-gray-300 py-3 rounded-lg flex-1 ml-2"
                            onPress={() => setFilterVisible(false)}
                            accessibilityLabel="Cancel filter"
                        >
                            <Text className="text-center text-gray-700 font-bold">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default FilterModal;
