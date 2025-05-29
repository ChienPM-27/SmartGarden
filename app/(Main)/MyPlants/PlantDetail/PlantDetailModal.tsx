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
    ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Plant } from '@/components/types/PlantTypes';
import ImagePickerService from '@/components/services/utils/imagePickerService';
import EditPlantModal from '../Modal/EditPLantModal';
import StorageService from '@/components/services/storage/storageService';
import { getAIResponse } from '@/components/services/geminiService';

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
    const [localPlant, setLocalPlant] = useState<Plant | null>(null);
    const [aiDescription, setAiDescription] = useState<string>('');
    const [isLoadingAI, setIsLoadingAI] = useState(false);

    // Reset photoUri when modal closes
    const handleClose = () => {
        setPhotoUri(null);
        setCurrentPlantId(null);
        setLocalPlant(null);
        setAiDescription('');
        handleClosePlantDetail();
    };

    // Update photoUri and localPlant when selectedPlant changes or when modal opens
    useEffect(() => {
        if (selectedPlant && (!currentPlantId || currentPlantId !== selectedPlant.id)) {
            setPhotoUri(selectedPlant.photoUri || selectedPlant.imageUri || null);
            setCurrentPlantId(selectedPlant.id);
            setLocalPlant({...selectedPlant});
            
            // Get AI description when plant is selected
            fetchAIDescription(selectedPlant);
        }
    }, [selectedPlant, currentPlantId]);

    const fetchAIDescription = async (plant: Plant) => {
        try {
            setIsLoadingAI(true);
            const imageSource = plant.photoUri || plant.imageUri;
            const prompt = `Hãy mô tả ngắn gọn về cây ${plant.name} (tên khoa học: ${plant.scientificName || 'không rõ'}). Đặc điểm chính: ${plant.type || 'không rõ loại'}, cần được tưới ${plant.waterStatus || 'theo định kỳ'}, nhiệt độ phù hợp ${plant.temperature || 'vừa phải'}. Cho tôi 2-3 câu mô tả về đặc điểm và cách chăm sóc.`;
            
            // Get AI response with or without image
            const response = await getAIResponse(prompt, imageSource || undefined);
            
            // Clean up AI response
            let cleanResponse = response.replace('🌱 SmartBot:', '').trim();
            setAiDescription(cleanResponse);
        } catch (error) {
            console.error('Error getting AI description:', error);
            setAiDescription('Không thể tải mô tả AI cho cây này. Vui lòng thử lại sau.');
        } finally {
            setIsLoadingAI(false);
        }
    };

    const handleChangeImage = async () => {
        try {
            setIsLoading(true);
            const result = await ImagePickerService.pickImageFromGallery();
            if (result && result.uri && localPlant) {
                const newUri = result.uri;
                setPhotoUri(newUri);
                
                // Update local state first
                const updatedPlant = {...localPlant, photoUri: newUri};
                setLocalPlant(updatedPlant);
                
                // Then update parent component state
                updatePlantPhoto(newUri);
                
                // Get new AI description with new image
                fetchAIDescription(updatedPlant);
            }
        } catch (error) {
            console.log('Error while picking image: ', error);
            Alert.alert('Lỗi', 'Không thể chọn ảnh. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenEditModal = () => {
        if (localPlant) {
            openEditModal();
        }
    };


    const handleCloseEditModal = () => {
        setEditModalVisible(false);
    };

    const handleSaveEdit = async (updatedPlant: Plant) => {
        try {
            setLocalPlant(updatedPlant);
            handleSavePlant(updatedPlant);

            // Update photo if changed
            setPhotoUri(updatedPlant.photoUri ?? null);
            
            // Get updated AI description
            fetchAIDescription(updatedPlant);

            setEditModalVisible(false);
            Alert.alert('Thành công', 'Thông tin cây đã được cập nhật');
        } catch (error) {
            console.error('Lỗi khi lưu thông tin cây:', error);
            Alert.alert('Lỗi', 'Không thể cập nhật thông tin cây. Vui lòng thử lại.');
        }
    };

    const confirmDeletePlant = () => {
        Alert.alert(
            'Xác nhận xóa',
            `Bạn có chắc chắn muốn xóa cây "${localPlant?.name}" không?`,
            [
                {
                    text: 'Hủy',
                    style: 'cancel'
                },
                {
                    text: 'Xóa',
                    onPress: handleDeletePlant,
                    style: 'destructive'
                }
            ]
        );
    };

    // If no plant is selected, don't render anything
    if (!localPlant) return null;

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
                            <Text style={styles.plantName} numberOfLines={1}>
                                {localPlant.name}
                            </Text>
                            <TouchableOpacity onPress={handleClose} accessibilityLabel="Đóng">
                                <MaterialIcons name="close" size={28} color="#10B981" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollViewContent}>
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
                                    <MaterialIcons name={localPlant.icon} size={64} color="#10B981" />
                                )}
                            </View>

                            {/* AI Description Section */}
                            <View style={styles.aiDescriptionContainer}>
                                <View style={styles.aiHeaderRow}>
                                    <MaterialIcons name="auto-awesome" size={18} color="#10B981" />
                                    <Text style={styles.aiDescriptionTitle}>Mô tả thông minh</Text>
                                </View>

                                {isLoadingAI ? (
                                    <View style={styles.aiLoadingContainer}>
                                        <ActivityIndicator size="small" color="#10B981" />
                                        <Text style={styles.aiLoadingText}>Đang tạo mô tả...</Text>
                                    </View>
                                ) : (
                                    <Text style={styles.aiDescriptionText}>
                                        {aiDescription || "Chưa có mô tả AI cho cây này."}
                                    </Text>
                                )}
                            </View>

                            <View style={styles.infoRow}>
                                <Text style={styles.label}>🔬 Tên khoa học:</Text>
                                <Text style={styles.value}>{localPlant.scientificName || 'N/A'}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>💧 Tưới nước:</Text>
                                <Text style={styles.value}>{localPlant.waterStatus || 'Chưa cập nhật'}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>🌡️ Nhiệt độ:</Text>
                                <Text style={styles.value}>{localPlant.temperature || 'Chưa cập nhật'}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>🌱 Loại cây:</Text>
                                <Text style={styles.value}>{localPlant.type || 'Chưa cập nhật'}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>📊 Tiến độ:</Text>
                                <Text style={styles.value}>{localPlant.progress || 'Chưa cập nhật'}</Text>
                            </View>
                            <View style={styles.infoRow}>
                                <Text style={styles.label}>📝 Mô tả:</Text>
                                <Text style={styles.value}>{localPlant.description || 'Chưa cập nhật'}</Text>
                            </View>

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity 
                                    style={styles.editButton} 
                                    onPress={handleOpenEditModal}
                                    accessibilityLabel="Chỉnh sửa cây"
                                >
                                    <Text style={styles.buttonText}>Chỉnh sửa</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.deleteButton} 
                                    onPress={confirmDeletePlant}
                                    accessibilityLabel="Xóa cây"
                                >
                                    <Text style={styles.buttonText}>Xóa</Text>
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity 
                                style={styles.addButton} 
                                onPress={handleChangeImage}
                                accessibilityLabel="Thêm hoặc thay đổi ảnh"
                            >
                                <Text style={styles.buttonText}>Thêm / Thay đổi ảnh</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
            
            {localPlant && (
                <EditPlantModal 
                    visible={editModalVisible}
                    plant={localPlant}
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
        width: '90%',
        maxHeight: '80%',
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
        flex: 1,
    },
    scrollView: {
        width: '100%',
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    imageContainer: {
        marginVertical: 10,
        marginTop: -5,
        width: '100%',
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        overflow: 'hidden',
    },
    plantImage: {
        width: '100%',
        height: 200,
        borderRadius: 12,
    },
    // AI Description styles
    aiDescriptionContainer: {
        width: '100%',
        backgroundColor: '#F0FDF4',
        borderRadius: 12,
        padding: 14,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#D1FAE5',
    },
    aiHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    aiDescriptionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#065F46',
        marginLeft: 6,
    },
    aiDescriptionText: {
        color: '#333333',
        lineHeight: 20,
        fontSize: 14,
    },
    aiLoadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
    },
    aiLoadingText: {
        color: '#666666',
        marginLeft: 8,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 6,
        width: '100%',
        borderBottomWidth: 0.5,
        borderBottomColor: '#E5E7EB',
        paddingBottom: 6,
    },
    label: {
        fontWeight: '600',
        color: '#065F46',
        flex: 0.4,
    },
    value: {
        color: '#14532D',
        flex: 0.6,
        textAlign: 'right',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
    },
    editButton: {
        backgroundColor: '#10B981',
        paddingVertical: 12,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
    },
    deleteButton: {
        backgroundColor: '#EF4444',
        paddingVertical: 12,
        borderRadius: 8,
        flex: 1,
        marginLeft: 5,
    },
    addButton: {
        backgroundColor: '#10B981',
        paddingVertical: 12,
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