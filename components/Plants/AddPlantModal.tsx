import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ImagePickerService from '@/components/services/imagePickerService';
import { Plant } from '../Common/types';

// Derive the type for MaterialIcon names. This should be at the top level of the module.
type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

interface AddPlantModalProps {
    visible: boolean;
    handleCloseAddPlant: () => void;
    handleSaveNewPlant: (newPlant: Omit<Plant, 'id'>) => void;
}

const AddPlantModal: React.FC<AddPlantModalProps> = ({
    visible,
    handleCloseAddPlant,
    handleSaveNewPlant,
}) => {
    const [name, setName] = useState('');
    const [scientificName, setScientificName] = useState('');
    const [waterStatus, setWaterStatus] = useState('');
    const [temperature, setTemperature] = useState('');
    const [type, setType] = useState('');             // For Plant.type: string
    const [progress, setProgress] = useState('');       // For Plant.progress: string
    const [description, setDescription] = useState(''); // For Plant.description: string
    const [photoUri, setPhotoUri] = useState<string | null>(null); // Stays string | null from picker
    const [iconInput, setIconInput] = useState<string>('eco'); // User input for icon name, defaults to 'eco'
    const [isLoadingImage, setIsLoadingImage] = useState(false);

    const resetState = () => {
        setName('');
        setScientificName('');
        setWaterStatus('');
        setTemperature('');
        setType('');
        setProgress('');
        setDescription('');
        setPhotoUri(null);
        setIconInput('eco'); // Reset user input for icon
        setIsLoadingImage(false);
    };

    useEffect(() => {
        if (!visible) {
            const timer = setTimeout(() => {
                resetState();
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    const handleLocalClose = () => {
        handleCloseAddPlant();
    };

    const handleChangeImage = async () => {
        try {
            setIsLoadingImage(true);
            const result = await ImagePickerService.pickImageFromGallery();
            if (result && result.uri) {
                setPhotoUri(result.uri);
            }
        } catch (error) {
            console.log('Error while picking image: ', error);
        } finally {
            setIsLoadingImage(false);
        }
    };

    const handleSave = () => {
        if (!name.trim()) {
            alert('Tên cây là bắt buộc.');
            return;
        }

        // Additional validation for mandatory string fields if they cannot be empty strings
        // For now, we'll allow empty strings if the user clears the input,
        // as "" is a valid string.
        // if (!type.trim() || !progress.trim() || !description.trim()) {
        //     alert('Các trường Loại cây, Tiến độ, Mô tả không được để trống.');
        //     return;
        // }

        const newPlantData: Omit<Plant, 'id'> = {
            name: name.trim(),
            scientificName: scientificName.trim() || undefined, // Assumes Plant.scientificName is optional (?: string)
            waterStatus: waterStatus.trim() || undefined,       // Assumes Plant.waterStatus is optional (?: string)
            temperature: temperature.trim() || undefined,     // Assumes Plant.temperature is optional (?: string)

            // For fields that MUST be string (cannot be undefined)
            // If the user clears the input, it becomes an empty string.
            type: type.trim(),
            progress: progress.trim(),
            description: description.trim(),

            // photoUri is optional in Plant (photoUri?: string or string | undefined)
            // Convert null from state to undefined for the Plant type
            photoUri: photoUri === null ? undefined : photoUri,

            // icon expects a specific MaterialIconName.
            // We take the user's input string (or default 'eco') and cast it.
            // This assumes 'eco' is a valid MaterialIconName.
            // Type safety for arbitrary user input here is a compromise with free-text input.
            icon: (iconInput.trim() || 'eco') as MaterialIconName,

            imageUri: undefined, // New plants don't have a remote imageUri
        };
        handleSaveNewPlant(newPlantData);
        handleLocalClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={handleLocalClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{width: '100%'}} contentContainerStyle={styles.scrollViewContent}>
                        <View style={styles.header}>
                            <Text style={styles.modalTitle}>Thêm cây mới</Text>
                            <TouchableOpacity onPress={handleLocalClose}>
                                <MaterialIcons name="close" size={28} color="#10B981" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.imageContainer}>
                            {isLoadingImage ? (
                                <ActivityIndicator size="large" color="#10B981" />
                            ) : photoUri ? (
                                <Image
                                    source={{ uri: photoUri }}
                                    style={styles.plantImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <MaterialIcons name="image" size={64} color="#A1A1AA" />
                            )}
                        </View>

                        <TouchableOpacity style={styles.actionButtonFullWidth} onPress={handleChangeImage}>
                            <Text style={styles.buttonText}>{photoUri ? 'Thay đổi hình ảnh' : 'Thêm hình ảnh'}</Text>
                        </TouchableOpacity>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>🪴 Tên cây:</Text>
                            <TextInput
                                style={styles.valueInput}
                                placeholder="Bắt buộc"
                                placeholderTextColor="#A1A1AA"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>🔬 Tên khoa học:</Text>
                            <TextInput
                                style={styles.valueInput}
                                placeholder="Không bắt buộc"
                                placeholderTextColor="#A1A1AA"
                                value={scientificName}
                                onChangeText={setScientificName}
                            />
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>💧 Tưới nước:</Text>
                            <TextInput
                                style={styles.valueInput}
                                placeholder="VD: 2 lần/tuần"
                                placeholderTextColor="#A1A1AA"
                                value={waterStatus}
                                onChangeText={setWaterStatus}
                            />
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>🌡️ Nhiệt độ:</Text>
                            <TextInput
                                style={styles.valueInput}
                                placeholder="VD: 20-25°C"
                                placeholderTextColor="#A1A1AA"
                                value={temperature}
                                onChangeText={setTemperature}
                            />
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>🌱 Loại cây:</Text>
                            <TextInput
                                style={styles.valueInput}
                                placeholder="Bắt buộc nếu không có giá trị mặc định" // Clarify mandatory nature
                                placeholderTextColor="#A1A1AA"
                                value={type}
                                onChangeText={setType}
                            />
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>📊 Tiến độ:</Text>
                            <TextInput
                                style={styles.valueInput}
                                placeholder="Bắt buộc nếu không có giá trị mặc định" // Clarify mandatory nature
                                placeholderTextColor="#A1A1AA"
                                value={progress}
                                onChangeText={setProgress}
                            />
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>📝 Mô tả:</Text>
                            <TextInput
                                style={[styles.valueInput, styles.multilineInput]}
                                placeholder="Bắt buộc nếu không có giá trị mặc định" // Clarify mandatory nature
                                placeholderTextColor="#A1A1AA"
                                value={description}
                                onChangeText={setDescription}
                                multiline
                                numberOfLines={3}
                            />
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>🏷️ Icon (tên):</Text>
                            <TextInput
                                style={styles.valueInput}
                                placeholder="VD: eco, local-florist"
                                placeholderTextColor="#A1A1AA"
                                value={iconInput}
                                onChangeText={setIconInput}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.buttonText}>Lưu cây</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleLocalClose}>
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        width: '90%',
        maxHeight: '90%',
        paddingVertical: 20,
        paddingHorizontal: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    scrollViewContent: {
      alignItems: 'center',
      width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        width: '100%',
        paddingHorizontal: 5,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#14532D',
    },
    imageContainer: {
        width: 200,
        height: 150,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        marginVertical: 15,
        overflow: 'hidden',
    },
    plantImage: {
        width: '100%',
        height: '100%',
    },
    actionButtonFullWidth: {
        backgroundColor: '#10B981',
        paddingVertical: 12,
        borderRadius: 8,
        marginTop: 0,
        marginBottom: 20,
        width: '100%',
        alignItems: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: 7,
        width: '100%',
        paddingHorizontal: 5,
    },
    label: {
        fontWeight: '600',
        color: '#065F46',
        fontSize: 15,
        flex: 0.45,
        marginRight: 5,
    },
    valueInput: {
        flex: 0.55,
        borderBottomWidth: 1,
        borderBottomColor: '#D1D5DB',
        paddingVertical: 8,
        paddingHorizontal: 6,
        fontSize: 15,
        color: '#14532D',
        textAlign: 'right',
    },
    multilineInput: {
        height: 80,
        textAlignVertical: 'top',
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        textAlign: 'left',
        padding: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 25,
        width: '100%',
        paddingHorizontal: 5,
    },
    saveButton: {
        backgroundColor: '#10B981',
        paddingVertical: 12,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#EF4444',
        paddingVertical: 12,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default AddPlantModal;