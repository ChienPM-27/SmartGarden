import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Plant } from '../Common/types';
import ImagePickerService from '@/components/services/imagePickerService';
import EditPlantModal from '../Plants/EditPLantModal';
import StorageService from '@/components/services/storageService';

interface PlantDetailModalProps {
    selectedPlant: Plant | null;
    handleClosePlantDetail: () => void;
    openEditModal: () => void;
    handleDeletePlant: () => void;
    updatePlantPhoto: (photoUri: string) => void;
    handleSavePlant: (updatedPlant: Plant) => void;
}

const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
    selectedPlant,
    handleClosePlantDetail,
    openEditModal,
    handleDeletePlant,
    updatePlantPhoto,
    handleSavePlant,
}) => {
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPlantId, setCurrentPlantId] = useState<string | null>(null);
    const [editModalVisible, setEditModalVisible] = useState(false);

    // Reset photoUri when modal closes
    const handleClose = () => {
        setPhotoUri(null);
        setCurrentPlantId(null);
        handleClosePlantDetail();
    };

    // Update photoUri when selectedPlant changes or when modal opens
    useEffect(() => {
        // Kiểm tra nếu cây đã thay đổi hoặc mới mở modal
        if (selectedPlant && (!currentPlantId || currentPlantId !== selectedPlant.id)) {
            setPhotoUri(selectedPlant.photoUri || selectedPlant.imageUri || null);
            setCurrentPlantId(selectedPlant.id);
        }
    }, [selectedPlant, currentPlantId]);

    const handleChangeImage = async () => {
        try {
            setIsLoading(true);
            const result = await ImagePickerService.pickImageFromGallery();
            if (result && result.uri && selectedPlant) {
                const newUri = result.uri;
                setPhotoUri(newUri);
                updatePlantPhoto(newUri);
            }
        } catch (error) {
            console.log('Error while picking image: ', error);
            Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenEditModal = () => {
        setEditModalVisible(true);
    };

    const handleCloseEditModal = () => {
        setEditModalVisible(false);
    };

    const handleSaveEdit = async (updatedPlant: Plant) => {
        try {
            // Gọi hàm cập nhật từ props được truyền từ component cha
            handleSavePlant(updatedPlant);
            
            // Đóng modal chỉnh sửa
            setEditModalVisible(false);
            
            Alert.alert('Thành công', 'Thông tin cây đã được cập nhật');
        } catch (error) {
            console.error('Lỗi khi lưu thông tin cây:', error);
            Alert.alert('Lỗi', 'Không thể cập nhật thông tin cây. Vui lòng thử lại.');
        }
    };

    return (
        <>
            <Modal
                visible={!!selectedPlant}
                animationType="fade"
                transparent
                onRequestClose={handleClose}
            >
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.header}>
                            <Text style={styles.plantName}>{selectedPlant?.name}</Text>
                            <TouchableOpacity onPress={handleClose}>
                                <MaterialIcons name="close" size={28} color="#10B981" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.imageContainer}>
                            {isLoading ? (
                                <ActivityIndicator size="large" color="#10B981" /> 
                            ) : photoUri ? (
                                <Image
                                    source={{ uri: photoUri }}
                                    style={styles.plantImage}
                                    resizeMode="cover"
                                />
                            ) : (
                                <MaterialIcons name={selectedPlant?.icon} size={64} color="#10B981" />
                            )}
                        </View>

                        <View style={styles.infoRow}>
                            <Text style={styles.label}>🔬 Tên khoa học:</Text>
                            <Text style={styles.value}>{selectedPlant?.scientificName || 'N/A'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>💧 Tưới nước:</Text>
                            <Text style={styles.value}>{selectedPlant?.waterStatus || 'Chưa cập nhật'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>🌡️ Nhiệt độ:</Text>
                            <Text style={styles.value}>{selectedPlant?.temperature || 'Chưa cập nhật'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>🌱 Loại cây:</Text>
                            <Text style={styles.value}>{selectedPlant?.type || 'Chưa cập nhật'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>📊 Tiến độ:</Text>
                            <Text style={styles.value}>{selectedPlant?.progress || 'Chưa cập nhật'}</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>📝 Mô tả:</Text>
                            <Text style={styles.value}>{selectedPlant?.description || 'Chưa cập nhật'}</Text>
                        </View>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.editButton} onPress={handleOpenEditModal}>
                                <Text style={styles.buttonText}>Chỉnh sửa</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePlant}>
                                <Text style={styles.buttonText}>Xóa</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={styles.addButton} onPress={handleChangeImage}>
                            <Text style={styles.buttonText}>Thêm / Thay đổi ảnh</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            
            {selectedPlant && (
                <EditPlantModal 
                    visible={editModalVisible}
                    plant={selectedPlant}
                    onClose={handleCloseEditModal}
                    onSave={handleSaveEdit}
                />
            )}
        </>
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
        width: '80%',
        padding: 16,
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
        width: '100%',
    },
    plantName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#14532D',
    },
    imageContainer: {
        marginVertical: 10,
        marginTop: -5,
        width: 260,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        overflow: 'hidden',
    },
    plantImage: {
        width: 260,
        height: 180,
        borderRadius: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
        width: '100%',
    },
    label: {
        fontWeight: '600',
        color: '#065F46',
    },
    value: {
        color: '#14532D',
        maxWidth: '60%',
        textAlign: 'right',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        width: '100%',
    },
    editButton: {
        backgroundColor: '#10B981',
        paddingVertical: 8,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: '#EF4444',
        paddingVertical: 8,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
    },
    addButton: {
        backgroundColor: '#10B981',
        paddingVertical: 10,
        borderRadius: 8,
        marginTop: 10,
        width: '100%',
    },
    buttonText: {
        color: '#FFFFFF',
        textAlign: 'center',    
        fontWeight: 'bold',
    },
});

export default PlantDetailModal;