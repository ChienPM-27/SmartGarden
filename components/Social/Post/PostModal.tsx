import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

interface PostModalProps {
  isVisible: boolean;
  onClose: () => void;
  onPost: (post: { 
    user: string, 
    avatar: string, 
    content: string, 
    image: string 
  }) => void;
}

const PostModal: React.FC<PostModalProps> = ({ isVisible, onClose, onPost }) => {
  const [content, setContent] = useState('');
  const [imageUri, setImageUri] = useState('');

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const handlePost = () => {
    if (content.trim() || imageUri) {
      onPost({
        user: 'Bạn',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        content: content.trim(),
        image: imageUri || 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80'
      });
      
      // Reset the modal
      setContent('');
      setImageUri('');
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <View style={styles.modalContentCentered}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={onClose}>
                <MaterialIcons name="close" size={24} color="#166534" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Tạo bài viết</Text>
              <TouchableOpacity onPress={handlePost}>
                <Text style={styles.postButton}>Đăng</Text>
              </TouchableOpacity>
            </View>

            {/* Content Input */}
            <TextInput
              style={styles.contentInput}
              multiline
              placeholder="Bạn đang nghĩ gì?"
              placeholderTextColor="#8E8E8E"
              value={content}
              onChangeText={setContent}
            />

            {/* Image Preview */}
            {imageUri ? (
              <Image 
                source={{ uri: imageUri }} 
                style={styles.imagePreview} 
                resizeMode="cover"
              />
            ) : null}

            {/* Actions */}
            <View style={styles.actionsContainer}>
              <TouchableOpacity 
                style={styles.actionButton}
                onPress={handlePickImage}
              >
                <MaterialIcons name="image" size={24} color="#166534" />
                <Text style={styles.actionText}>Ảnh</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContentCentered: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 16,
    width: '92%',
    maxWidth: 420,
    maxHeight: '90%',
    alignSelf: 'center',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#166534',
  },
  postButton: {
    color: '#10B981',
    fontWeight: 'bold',
  },
  contentInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#262626',
    marginBottom: 16,
  },
  imagePreview: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionText: {
    marginLeft: 8,
    color: '#166534',
  },
});

export default PostModal;