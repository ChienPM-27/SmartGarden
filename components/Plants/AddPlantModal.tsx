import React, { useState } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    Image,
    TextInput,
    StyleSheet,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import ImagePickerService from '@/components/services/imagePickerService';

interface AddPlantModalProps {
    handleCloseAddPlant: () => void;
    handleSaveNewPlant: (newPlant: { name: string; description: string; photoUri: string }) => void;
}

const AddPlantModal: React.FC<AddPlantModalProps> = ({ handleCloseAddPlant, handleSaveNewPlant }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [photoUri, setPhotoUri] = useState<string | null>(null);

    const handleChangeImage = async () => {
        try {
            const result = await ImagePickerService.pickImageFromGallery();
            if (result && result.uri) {
                setPhotoUri(result.uri);
                console.log('Image selected: ', result.uri);
            }
        } catch (error) {
            console.log('Error while picking image: ', error);
        }
    };

    const handleSave = () => {
        if (name && description && photoUri) {
            handleSaveNewPlant({ name, description, photoUri });
        } else {
            console.log('Please fill all fields');
        }
    };

    return (
        <Modal
            visible={true}
            animationType="fade"
            transparent
            onRequestClose={handleCloseAddPlant}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.plantName}>Thêm cây mới</Text>
                        <TouchableOpacity onPress={handleCloseAddPlant}>
                            <MaterialIcons name="close" size={28} color="#10B981" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.imageContainer}>
                        {photoUri ? (
                            <Image
                                source={{ uri: photoUri }}
                                style={styles.plantImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <MaterialIcons name="image" size={64} color="#10B981" />
                        )}
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="Tên cây"
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Mô tả"
                        value={description}
                        onChangeText={setDescription}
                    />

                    <TouchableOpacity style={styles.addButton} onPress={handleChangeImage}>
                        <Text style={styles.buttonText}>Thêm / Đổi ảnh</Text>
                    </TouchableOpacity>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                            <Text style={styles.buttonText}>Lưu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={handleCloseAddPlant}>
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
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        marginBottom: 12,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#10B981',
        paddingVertical: 8,
        borderRadius: 8,
        flex: 1,
        marginRight: 5,
    },
    cancelButton: {
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

export default AddPlantModal;
