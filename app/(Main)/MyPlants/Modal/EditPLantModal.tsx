import React, { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    StyleSheet,
    ScrollView,
    Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Plant } from '../../../../components/types/PlantTypes';

type MaterialIconName = keyof typeof MaterialIcons.glyphMap;

interface EditPlantModalProps {
    visible: boolean;
    plant: Plant;
    onClose: () => void;
    onSave: (updatedPlant: Plant) => void;
}

const EditPlantModal: React.FC<EditPlantModalProps> = ({
    visible,
    plant,
    onClose,
    onSave,
}) => {
    const [name, setName] = useState('');
    const [scientificName, setScientificName] = useState('');
    const [waterStatus, setWaterStatus] = useState('');
    const [temperature, setTemperature] = useState('');
    const [type, setType] = useState('');
    const [progress, setProgress] = useState('');
    const [description, setDescription] = useState('');
    const [iconInput, setIconInput] = useState('');

    // Initialize form with plant data when modal opens
    useEffect(() => {
        if (visible && plant) {
            setName(plant.name || '');
            setScientificName(plant.scientificName || '');
            setWaterStatus(plant.waterStatus || '');
            setTemperature(plant.temperature || '');
            setType(plant.type || '');
            setProgress(plant.progress || '');
            setDescription(plant.description || '');
            setIconInput(plant.icon || 'eco');
        }
    }, [visible, plant]);

    const handleSave = () => {
        if (!name.trim()) {
            alert('Tên cây là bắt buộc.');
            return;
        }

        const updatedPlant: Plant = {
            ...plant,
            name: name.trim(),
            scientificName: scientificName.trim() || undefined,
            waterStatus: waterStatus.trim() || undefined,
            temperature: temperature.trim() || undefined,
            type: type.trim(),
            progress: progress.trim(),
            description: description.trim(),
            icon: (iconInput.trim() || 'eco') as MaterialIconName,
        };

        onSave(updatedPlant);
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <ScrollView style={{width: '100%'}} contentContainerStyle={styles.scrollViewContent}>
                        <View style={styles.header}>
                            <Text style={styles.modalTitle}>Chỉnh sửa cây</Text>
                            <TouchableOpacity onPress={onClose}>
                                <MaterialIcons name="close" size={28} color="#10B981" />
                            </TouchableOpacity>
                        </View>

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
                                placeholder="Bắt buộc"
                                placeholderTextColor="#A1A1AA"
                                value={type}
                                onChangeText={setType}
                            />
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>📊 Tiến độ:</Text>
                            <TextInput
                                style={styles.valueInput}
                                placeholder="Bắt buộc"
                                placeholderTextColor="#A1A1AA"
                                value={progress}
                                onChangeText={setProgress}
                            />
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>📝 Mô tả:</Text>
                            <TextInput
                                style={[styles.valueInput, styles.multilineInput]}
                                placeholder="Bắt buộc"
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
                                <Text style={styles.buttonText}>Lưu thay đổi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
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

export default EditPlantModal;