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

  const handleRemoveImage = () => {
    setImageUri('');
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
          style={styles.keyboardAvoidContainer}
        >
          <View style={styles.modalContent}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={onClose} style={styles.headerButton}>
                <MaterialIcons name="close" size={24} color="#166534" />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Tạo bài viết</Text>
              <TouchableOpacity 
                onPress={handlePost} 
                disabled={!content.trim() && !imageUri}
                style={styles.headerButton}
              >
                <Text style={[
                  styles.postButton, 
                  (!content.trim() && !imageUri) && styles.postButtonDisabled
                ]}>
                  Đăng
                </Text>
              </TouchableOpacity>
            </View>

            {/* User Info */}
            <View style={styles.userInfoContainer}>
              <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/1.jpg' }} 
                style={styles.userAvatar} 
              />
              <Text style={styles.userName}>Bạn</Text>
            </View>

            {/* Content Input */}
            <ScrollView 
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.scrollViewContent}
            >
              <TextInput
                style={styles.contentInput}
                multiline
                placeholder="Bạn đang nghĩ gì?"
                placeholderTextColor="#8E8E8E"
                value={content}
                onChangeText={setContent}
                textAlignVertical="top"
              />

              {/* Image Preview */}
              {imageUri && (
                <View style={styles.imagePreviewContainer}>
                  <Image 
                    source={{ uri: imageUri }} 
                    style={styles.imagePreview} 
                    resizeMode="cover"
                  />
                  <TouchableOpacity 
                    style={styles.removeImageButton}
                    onPress={handleRemoveImage}
                  >
                    <MaterialIcons name="close" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>

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
    justifyContent: 'flex-end',
  },
  keyboardAvoidContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '66%', // Changed to 2/3 of the screen
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    width: 60,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#166534',
    textAlign: 'center',
  },
  postButton: {
    color: '#10B981',
    fontWeight: 'bold',
    textAlign: 'right',
  },
  postButtonDisabled: {
    color: '#A1A1AA',
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#262626',
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  contentInput: {
    minHeight: 100,
    fontSize: 16,
    color: '#262626',
  },
  imagePreviewContainer: {
    position: 'relative',
    marginTop: 16,
  },
  imagePreview: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    marginLeft: 8,
    color: '#166534',
  },
});

export default PostModal;