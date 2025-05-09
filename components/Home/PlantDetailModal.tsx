import React from 'react';
import { Modal, View, ScrollView, Text, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Plant } from './types';

interface PlantDetailModalProps {
    selectedPlant: Plant | null;
    handleClosePlantDetail: () => void;
    openEditModal: () => void;
    handleDeletePlant: () => void;
    pickImage?: () => Promise<void>;
}

const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
    selectedPlant,
    handleClosePlantDetail,
    openEditModal,
    handleDeletePlant,
    pickImage,
}) => {
    return (
        <Modal visible={selectedPlant !== null} animationType="slide" transparent onRequestClose={handleClosePlantDetail}>
            <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
                <ScrollView className="bg-white rounded-2xl w-5/6 p-6">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold text-green-900">{selectedPlant?.name}</Text>
                        <TouchableOpacity onPress={handleClosePlantDetail} accessibilityLabel="Close plant detail">
                            <MaterialIcons name="close" size={28} color="#10B981" />
                        </TouchableOpacity>
                    </View>
                    {selectedPlant && (
                        <>
                            <View className="items-center mb-4">
                                {selectedPlant.photoUri ? (
                                    <Image
                                        source={{ uri: selectedPlant.photoUri }}
                                        style={{ width: 200, height: 150, borderRadius: 12 }}
                                        resizeMode="cover"
                                        accessibilityLabel="Plant photo"
                                    />
                                ) : (
                                    <MaterialIcons name={selectedPlant.icon} size={64} color="#10B981" />
                                )}
                            </View>
                            <Text className="text-green-900 mb-2"><Text className="font-bold">Type:</Text> {selectedPlant.type}</Text>
                            <Text className="text-green-900 mb-2"><Text className="font-bold">Progress:</Text> {selectedPlant.progress}</Text>
                            <Text className="text-green-900 mb-4">{selectedPlant.description}</Text>
                            <View className="flex-row justify-between space-x-3">
                                <TouchableOpacity
                                    className="bg-green-600 py-3 rounded-lg flex-1"
                                    onPress={openEditModal}
                                    accessibilityLabel="Edit plant details"
                                >
                                    <Text className="text-center text-white font-bold">Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    className="bg-red-600 py-3 rounded-lg flex-1"
                                    onPress={handleDeletePlant}
                                    accessibilityLabel="Delete plant"
                                >
                                    <Text className="text-center text-white font-bold">Delete</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                className="bg-green-600 py-3 rounded-lg mt-4"
                                onPress={pickImage}
                                accessibilityLabel="Add or change plant photo"
                            >
                                <Text className="text-center text-white font-bold">Add / Change Photo</Text>
                            </TouchableOpacity>
                        </>
                    )}
                </ScrollView>
            </View>
        </Modal>
    );
};

export default PlantDetailModal;
