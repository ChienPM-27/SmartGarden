import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    ActivityIndicator, // Thêm ActivityIndicator cho hiệu ứng loading
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Plant } from '../Common/types';
import ImagePickerService from '@/components/services/imagePickerService';

interface PlantDetailModalProps {
    selectedPlant: Plant | null;
    handleClosePlantDetail: () => void;
    openEditModal: () => void;
    handleDeletePlant: () => void;
    updatePlantPhoto: (photoUri: string) => void; // Hàm truyền vào để cập nhật ảnh
}

const PlantDetailModal: React.FC<PlantDetailModalProps> = ({
    selectedPlant,
    handleClosePlantDetail,
    openEditModal,
    handleDeletePlant,
    updatePlantPhoto, // Nhận hàm update ảnh từ component cha
}) => {
    const [photoUri, setPhotoUri] = useState<string | null>(selectedPlant?.photoUri || null);
    const [isLoading, setIsLoading] = useState(false); // Trạng thái loading khi thay đổi ảnh

    const handleChangeImage = async () => {
        try {
            setIsLoading(true); // Bắt đầu loading khi chọn ảnh
            const result = await ImagePickerService.pickImageFromGallery();
            if (result && result.uri) {
                setPhotoUri(result.uri); // Cập nhật ảnh vào state modal
                if (selectedPlant) {
                    updatePlantPhoto(result.uri); // Gọi hàm update để cập nhật ảnh trong cây
                }
            }
        } catch (error) {
            console.log('Error while picking image: ', error);
        } finally {
            setIsLoading(false); // Kết thúc loading
        }
    };

    return (
        <Modal
            visible={!!selectedPlant}
            animationType="fade"
            transparent
            onRequestClose={handleClosePlantDetail}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.plantName}>{selectedPlant?.name}</Text>
                        <TouchableOpacity onPress={handleClosePlantDetail}>
                            <MaterialIcons name="close" size={28} color="#10B981" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.imageContainer}>
                        {isLoading ? (
                            <ActivityIndicator size="large" color="#10B981" /> // Hiển thị loading
                        ) : photoUri ? (
                            <Image
                                source={{ uri: photoUri }} // Hiển thị ảnh mới chọn
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

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.editButton} onPress={openEditModal}>
                            <Text style={styles.buttonText}>Chỉnh sửa</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.deleteButton} onPress={handleDeletePlant}>
                            <Text style={styles.buttonText}>Xóa</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.addButton} onPress={handleChangeImage}>
                        <Text style={styles.buttonText}>Thêm / Đổi ảnh</Text>
                    </TouchableOpacity>
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
    },
    plantImage: {
        width: 150,
        height: 100,
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
