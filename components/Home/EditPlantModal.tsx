import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Plant } from './types'; // Điều chỉnh đường dẫn tới file types.ts của bạn

interface EditPlantModalProps {
  editModalVisible: boolean;
  setEditModalVisible: (visible: boolean) => void;
  editingPlant: Plant | null;
  setEditingPlant: React.Dispatch<React.SetStateAction<Plant | null>>;
  handleSaveEdit: () => void;
}

const EditPlantModal: React.FC<EditPlantModalProps> = ({
  editModalVisible,
  setEditModalVisible,
  editingPlant,
  setEditingPlant,
  handleSaveEdit,
}) => {
  return (
    <Modal
      visible={editModalVisible}
      animationType="slide"
      transparent
      onRequestClose={() => setEditModalVisible(false)}
    >
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
    width: '80%',
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
  buttonContainer: {
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
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default EditPlantModal;
