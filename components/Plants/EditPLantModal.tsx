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

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

interface EditPlantModalProps {
    visible: boolean;
    plantData: Plant;
    handleCloseEditPlant: () => void;
    handleUpdatePlant: (updatedPlant: Plant) => void;
}

const EditPlantModal: React.FC<EditPlantModalProps> = ({
    visible,
    plantData,
    handleCloseEditPlant,
    handleUpdatePlant,
}) => {
    const [name, setName] = useState(plantData.name);
    const [scientificName, setScientificName] = useState(plantData.scientificName || '');
    const [waterStatus, setWaterStatus] = useState(plantData.waterStatus || '');
    const [temperature, setTemperature] = useState(plantData.temperature || '');
    const [type, setType] = useState(plantData.type);
    const [progress, setProgress] = useState(plantData.progress);
    const [description, setDescription] = useState(plantData.description);
    const [photoUri, setPhotoUri] = useState<string | null>(plantData.photoUri || null);
    const [iconInput, setIconInput] = useState<string>(plantData.icon);
    const [isLoadingImage, setIsLoadingImage] = useState(false);

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

        const updatedPlantData: Plant = {
            ...plantData,
            name: name.trim(),
            scientificName: scientificName.trim(),
            waterStatus: waterStatus.trim(),
            temperature: temperature.trim(),
            type: type.trim(),
            progress: progress.trim(),
            description: description.trim(),
            photoUri: photoUri || undefined,
            icon: iconInput.trim() as MaterialIconName,
        };

        handleUpdatePlant(updatedPlantData);
        handleCloseEditPlant();
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={handleCloseEditPlant}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{ width: '100%' }} contentContainerStyle={styles.scrollViewContent}>
                        <View style={styles.header}>
                            <Text style={styles.modalTitle}>Chỉnh sửa cây trồng</Text>
                            <TouchableOpacity onPress={handleCloseEditPlant}>
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
                            <Text style={styles.label}>🌱 Loại cây:</Text>
                            <TextInput style={styles.valueInput} value={type} onChangeText={setType} />
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>📊 Tiến độ:</Text>
                            <TextInput style={styles.valueInput} value={progress} onChangeText={setProgress} />
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>📝 Mô tả:</Text>
                            <TextInput style={[styles.valueInput, styles.multilineInput]} value={description} onChangeText={setDescription} multiline numberOfLines={3} />
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>🏷️ Icon (tên):</Text>
                            <TextInput style={styles.valueInput} value={iconInput} onChangeText={setIconInput} autoCapitalize="none" />
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                                <Text style={styles.buttonText}>Lưu thay đổi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCloseEditPlant}>
                                <Text style={styles.buttonText}>Hủy</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default EditPlantModal;

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
