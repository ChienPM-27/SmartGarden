import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Plant } from '../Common/types';
import ImagePickerService from '@/components/services/imagePickerService';

interface EditPlantModalProps {
    visible: boolean;
    plant: Plant | null;
    onClose: () => void;
    onSave: (updatedPlant: Plant) => void;
}

const EditPlantModal: React.FC<EditPlantModalProps> = ({
    visible,
    plant,
    onClose,
    onSave,
}) => {
    const [editedPlant, setEditedPlant] = useState<Plant | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (plant) {
            setEditedPlant({ ...plant });
        }
    }, [plant]);

    const handleChangeImage = async () => {
        if (!editedPlant) return;
        
        try {
            setIsLoading(true);
            const result = await ImagePickerService.pickImageFromGallery();
            if (result && result.uri) {
                setEditedPlant({ ...editedPlant, photoUri: result.uri });
            }
        } catch (error) {
            console.log('Error while picking image: ', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = () => {
        if (!editedPlant || !editedPlant.name.trim()) {
            alert('Vui lòng nhập tên cây');
            return;
        }
        onSave(editedPlant);
    };

    if (!editedPlant) return null;

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.modalTitle}>Chỉnh sửa cây</Text>
                        <TouchableOpacity onPress={onClose}>
                            <MaterialIcons name="close" size={28} color="#10B981" />
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={styles.scrollView}>
                        <View style={styles.imageContainer}>
                            {editedPlant.photoUri || editedPlant.imageUri ? (
                                <Image
                                    source={{ uri: editedPlant.photoUri || editedPlant.imageUri }}
                                    style={styles.plantImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <MaterialIcons name={editedPlant.icon} size={64} color="#10B981" />
                            )}
                        </View>

                        <TouchableOpacity style={styles.imageButton} onPress={handleChangeImage}>
                            <Text style={styles.buttonText}>Thay đổi ảnh</Text>
                        </TouchableOpacity>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tên cây:</Text>
                            <TextInput
                                style={styles.input}
                                value={editedPlant.name}
                                onChangeText={(text) => setEditedPlant({ ...editedPlant, name: text })}
                                placeholder="Nhập tên cây"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mô tả:</Text>
                            <TextInput
                                style={styles.input}
                                value={editedPlant.description}
                                onChangeText={(text) => setEditedPlant({ ...editedPlant, description: text })}
                                placeholder="Nhập mô tả"
                                multiline
                                numberOfLines={2}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tên khoa học:</Text>
                            <TextInput
                                style={styles.input}
                                value={editedPlant.scientificName || ''}
                                onChangeText={(text) => setEditedPlant({ ...editedPlant, scientificName: text })}
                                placeholder="Nhập tên khoa học"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Loại cây:</Text>
                            <TextInput
                                style={styles.input}
                                value={editedPlant.type}
                                onChangeText={(text) => setEditedPlant({ ...editedPlant, type: text })}
                                placeholder="Nhập loại cây"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Trạng thái tưới nước:</Text>
                            <TextInput
                                style={styles.input}
                                value={editedPlant.waterStatus || ''}
                                onChangeText={(text) => setEditedPlant({ ...editedPlant, waterStatus: text })}
                                placeholder="Nhập trạng thái tưới nước"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nhiệt độ:</Text>
                            <TextInput
                                style={styles.input}
                                value={editedPlant.temperature || ''}
                                onChangeText={(text) => setEditedPlant({ ...editedPlant, temperature: text })}
                                placeholder="Nhập nhiệt độ"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Tiến độ:</Text>
                            <TextInput
                                style={styles.input}
                                value={editedPlant.progress}
                                onChangeText={(text) => setEditedPlant({ ...editedPlant, progress: text })}
                                placeholder="Nhập tiến độ"
                            />
                        </View>
                    </ScrollView>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.buttonText}>Lưu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text style={styles.buttonText}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
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
        maxHeight: '80%',
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        width: '100%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#14532D',
    },
    scrollView: {
        maxHeight: '75%',
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 12,
    },
    plantImage: {
        width: 200,
        height: 150,
        borderRadius: 12,
    },
    imageButton: {
        backgroundColor: '#10B981',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#065F46',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#D1D5DB',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#F9FAFB',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    saveButton: {
        backgroundColor: '#10B981',
        paddingVertical: 12,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
    },
    cancelButton: {
        backgroundColor: '#EF4444',
        paddingVertical: 12,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default EditPlantModal;