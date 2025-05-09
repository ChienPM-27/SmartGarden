import React from 'react';
import { Modal, View, ScrollView, Text, TextInput, TouchableOpacity } from 'react-native';
import { Plant } from './types'; // Điều chỉnh đường dẫn nếu cần

interface AddPlantModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    newPlant: Plant;
    setNewPlant: React.Dispatch<React.SetStateAction<Plant>>;
    handleAddPlant: () => void;
}

const AddPlantModal: React.FC<AddPlantModalProps> = ({
    modalVisible,
    setModalVisible,
    newPlant,
    setNewPlant,
    handleAddPlant,
}) => {
    return (
        <Modal
            visible={modalVisible}
            animationType="slide"
            transparent
            onRequestClose={() => setModalVisible(false)}
        >
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <ScrollView className="bg-white rounded-2xl w-5/6 p-6">
                    <Text className="text-xl font-bold text-green-900 mb-4">Add New Plant</Text>
                    <TextInput
                        placeholder="Plant Name"
                        value={newPlant.name}
                        onChangeText={(text) => setNewPlant({ ...newPlant, name: text })}
                        className="border border-gray-300 rounded-lg p-3 mb-4"
                        accessibilityLabel="Input plant name"
                    />
                    <TextInput
                        placeholder="Description"
                        value={newPlant.description}
                        onChangeText={(text) => setNewPlant({ ...newPlant, description: text })}
                        className="border border-gray-300 rounded-lg p-3 mb-4"
                        accessibilityLabel="Input plant description"
                    />
                    <TextInput
                        placeholder="Plant Type"
                        value={newPlant.type}
                        onChangeText={(text) => setNewPlant({ ...newPlant, type: text })}
                        className="border border-gray-300 rounded-lg p-3 mb-4"
                        accessibilityLabel="Input plant type"
                    />
                    <TextInput
                        placeholder="Growing Progress"
                        value={newPlant.progress}
                        onChangeText={(text) => setNewPlant({ ...newPlant, progress: text })}
                        className="border border-gray-300 rounded-lg p-3 mb-4"
                        accessibilityLabel="Input growing progress"
                    />
                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            className="bg-green-600 py-3 rounded-lg flex-1 mr-2"
                            onPress={handleAddPlant}
                            accessibilityLabel="Save new plant"
                        >
                            <Text className="text-center text-white font-bold">Save</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className="bg-gray-300 py-3 rounded-lg flex-1 ml-2"
                            onPress={() => setModalVisible(false)}
                            accessibilityLabel="Cancel adding plant"
                        >
                            <Text className="text-center text-gray-700 font-bold">Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

export default AddPlantModal;
