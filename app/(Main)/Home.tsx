import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Modal,
    ScrollView,
    Image,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import {router, useRouter} from 'expo-router';
import { StyleSheet } from 'react-native';
import NavigationBar from "@/components/NavigationBar";


interface Plant {
    id: string;
    name: string;
    description: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    type: string;
    progress: string;
    photoUri?: string;
}

const initialPlantsData: Plant[] = [
    {
        id: '1',
        name: 'Cây Mía',
        description: 'Cây trồng lâu năm',
        icon: 'grass',
        type: 'Cây thân gỗ',
        progress: 'Đã thu hoạch',
    },
    {
        id: '2',
        name: 'Cây Xanh',
        description: 'Cây mới trồng',
        icon: 'grass',
        type: 'Cây bụi',
        progress: 'Giai đoạn phát triển',
    },
    {
        id: '3',
        name: 'Cây Lá',
        description: 'Cây trong nhà',
        icon: 'grass',
        type: 'Cây cảnh',
        progress: 'Giai đoạn sinh trưởng',
    },
    {
        id: '4',
        name: 'Cây Hoa',
        description: 'Cây ngoài vườn',
        icon: 'grass',
        type: 'Cây hoa',
        progress: 'Giai đoạn ra hoa',
    },
];

export default function SmartGardenHome() {
    const [searchText, setSearchText] = useState<string>('');
    const [plants, setPlants] = useState<Plant[]>(initialPlantsData);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [filterVisible, setFilterVisible] = useState<boolean>(false);
    const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
    const [editModalVisible, setEditModalVisible] = useState<boolean>(false);
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
    const [filterCriteria, setFilterCriteria] = useState<string>('');

    const handleSearch = (text: string) => {
        setSearchText(text);
        if (text) {
            const filteredPlants = plants.filter((plant) =>
                plant.name.toLowerCase().includes(text.toLowerCase())
            );
            setPlants(filteredPlants);
        } else {
            setPlants(initialPlantsData);
        }
    };

    const handleFilter = () => {
        if (filterCriteria) {
            const filteredPlants = initialPlantsData.filter((plant) =>
                plant.description.toLowerCase().includes(filterCriteria.toLowerCase())
            );
            setPlants(filteredPlants);
        } else {
            setPlants(initialPlantsData);
        }
        setFilterVisible(false);
    };

    const handleAddPlant = () => {
        if (!newPlant.name.trim()) {
            Alert.alert('Warning', 'Please enter plant name');
            return;
        }
        const newId = (plants.length + 1).toString();
        const plantToAdd = { ...newPlant, id: newId, icon: 'grass' as const };
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

    const handleOpenPlantDetail = (plant: Plant) => {
        setSelectedPlant(plant);
    };

    const handleClosePlantDetail = () => {
        setSelectedPlant(null);
    };

    // Image picker for adding photo to selected plant or editing plant
    const pickImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
            alert('Permission to access camera roll is required!');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const uri = result.assets[0]?.uri;
            if (uri) {
                if (editModalVisible && editingPlant) {
                    // Update editingPlant photoUri
                    setEditingPlant({ ...editingPlant, photoUri: uri });
                } else if (selectedPlant) {
                    // Update selectedPlant photo in plants and state
                    const updatedPlants = plants.map((plant) =>
                        plant.id === selectedPlant.id ? { ...plant, photoUri: uri } : plant
                    );
                    setPlants(updatedPlants);
                    setSelectedPlant({ ...selectedPlant, photoUri: uri });
                }
            }
        }
    };

    // Open edit modal with selected plant data
    const openEditModal = () => {
        if (selectedPlant) {
            setEditingPlant(selectedPlant);
            setEditModalVisible(true);
        }
    };

    // Save edited plant data
    const handleSaveEdit = () => {
        if (!editingPlant?.name.trim()) {
            Alert.alert('Warning', 'Please enter plant name');
            return;
        }
        // Update plants list
        const updatedPlants = plants.map((plant) =>
            plant.id === editingPlant?.id ? editingPlant : plant
        );
        setPlants(updatedPlants);
        setSelectedPlant(editingPlant);
        setEditModalVisible(false);
    };

    // Delete plant with confirmation
    const handleDeletePlant = () => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this plant?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: () => {
                        if (!selectedPlant) return;
                        const filteredPlants = plants.filter(
                            (plant) => plant.id !== selectedPlant.id
                        );
                        setPlants(filteredPlants);
                        setSelectedPlant(null);
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-green-100">
                <View className="p-4 flex-row items-center justify-between">
                    <View>
                        <Text className="font-bold pt-3 px-3 text-green-900" style={{ fontSize: 40, lineHeight: 40 }}>
                            Smart
                        </Text>
                        <Text className="font-bold pt-3 px-3 text-green-900" style={{ fontSize: 40, lineHeight: 40 }}>
                            Garden
                        </Text>
                    </View>
                    <View className="absolute right-2 top-4 w-15 h-15 bg-white rounded-full">
                        <Text style={{ fontSize: 50 }}>🌟</Text>
                    </View>
                </View>



            <View className="px-4 mb-4">
                {/* Search bar with embedded filter button */}
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
                        className="ml-2 p-1 bg-green-600 rounded-full"  // Bo tròn nút filter
                        onPress={() => setFilterVisible(true)}
                        accessibilityLabel="Filter plants"
                        accessibilityHint="Opens filter options modal"
                    >
                        <MaterialIcons name="filter-list" size={24} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Add Plant Button */}
                <TouchableOpacity
                    className="bg-green-600 rounded-full py-3 flex-row items-center justify-center mb-2"
                    onPress={() => setModalVisible(true)}
                    accessibilityLabel="Add new plant"
                >
                    <MaterialIcons name="add" size={20} color="#FFFFFF" />
                    <Text className="text-white font-bold ml-2">Add Plant</Text>
                </TouchableOpacity>
            </View>


            <FlatList
                data={plants}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="bg-white rounded-full mx-4 my-2 p-4 flex-row items-center justify-between"
                        onPress={() => handleOpenPlantDetail(item)}
                        accessibilityLabel={`View details for ${item.name}`}
                    >
                        <View className="flex-row items-center">
                            <MaterialIcons name={item.icon} size={24} color="#10B981" />
                            <View className="ml-4">
                                <Text className="text-green-900 font-bold">{item.name}</Text>
                                <Text className="text-gray-500">{item.description}</Text>
                            </View>
                        </View>
                        <MaterialIcons name="chevron-right" size={24} color="#10B981" />
                    </TouchableOpacity>
                )}
            />

            {/*Thanh dieu huong*/}
            <View style={styles.buttonContainer}>
                <NavigationBar/>
            </View>

            {/* Add Plant Modal */}
            <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
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

            {/* Filter Modal */}
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

            {/* Plant Detail Modal */}
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

            {/* Edit Plant Modal */}
            <Modal visible={editModalVisible} animationType="slide" transparent onRequestClose={() => setEditModalVisible(false)}>
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Edit Plant Details</Text>
                            <TextInput
                                placeholder="Plant Name"
                                value={editingPlant?.name || ''}
                                onChangeText={(text) =>
                                    editingPlant && setEditingPlant({ ...editingPlant, name: text })
                                }
                                style={styles.input}
                                accessibilityLabel="Edit plant name"
                            />
                            <TextInput
                                placeholder="Description"
                                value={editingPlant?.description || ''}
                                onChangeText={(text) =>
                                    editingPlant && setEditingPlant({ ...editingPlant, description: text })
                                }
                                style={styles.input}
                                accessibilityLabel="Edit plant description"
                            />
                            <TextInput
                                placeholder="Plant Type"
                                value={editingPlant?.type || ''}
                                onChangeText={(text) =>
                                    editingPlant && setEditingPlant({ ...editingPlant, type: text })
                                }
                                style={styles.input}
                                accessibilityLabel="Edit plant type"
                            />
                            <TextInput
                                placeholder="Growing Progress"
                                value={editingPlant?.progress || ''}
                                onChangeText={(text) =>
                                    editingPlant && setEditingPlant({ ...editingPlant, progress: text })
                                }
                                style={styles.input}
                                accessibilityLabel="Edit growing progress"
                            />
                        <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveEdit}
                    accessibilityLabel="Save edited plant"
                >
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setEditModalVisible(false)}
                    accessibilityLabel="Cancel editing plant"
                >
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
</Modal>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    // Thanh navigation button
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#10B981', // Tailwind green-600
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 10,
        paddingBottom: 20,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 20,
        backgroundColor: '#10B981', // Tailwind green-600
        marginHorizontal: 5,
        elevation: 3, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: 5,
    },

    // Thêm mới
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        height: '50%', // Giảm chiều cao modal
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
    buttonContainerModal: {
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
    buttonTextModal: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
});
