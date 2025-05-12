import React, { useState } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Image, 
  FlatList,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export type Comment = {
  id: string;
  user: string;
  avatar: string;
  content: string;
  time: string;
};

interface CommentModalProps {
  isVisible: boolean;
  onClose: () => void;
  postUser: string;
  comments?: Comment[];
  onAddComment: (comment: Omit<Comment, 'id'>) => void;
}

const CommentItem: React.FC<{ item: Comment }> = ({ item }) => (
  <View style={styles.commentItem}>
    <Image source={{ uri: item.avatar }} style={styles.commentAvatar} />
    <View style={styles.commentContent}>
      <Text style={styles.commentUser}>{item.user}</Text>
      <Text style={styles.commentText}>{item.content}</Text>
      <Text style={styles.commentTime}>{item.time}</Text>
    </View>
  </View>
);

const CommentModal: React.FC<CommentModalProps> = ({ 
  isVisible, 
  onClose, 
  postUser, 
  comments = [], 
  onAddComment 
}) => {
  const [commentText, setCommentText] = useState('');

  const handleSendComment = () => {
    if (commentText.trim()) {
      onAddComment({
        user: 'Bạn',
        avatar: 'https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/480681851_1843038753128474_8873796576016633436_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Ay-q9iTYjqMQ7kNvwERSrcX&_nc_oc=AdlLmpSpKAVUKaZu2XPDncMiodoItY-49xLkpiwDz3SC7d0AumbfyT8RD3iWdKQsCtg&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=M4yhnbpFX53mWI4v1LZc6Q&oh=00_AfLZOS4EzzLazs06gDk9P4hGRi4G-EDglGlgEIZkO1AkxQ&oe=682805AC',
        content: commentText.trim(),
        time: 'Vừa xong'
      });
      setCommentText('');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" size={24} color="#166534" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Bình luận</Text>
            <View style={styles.placeholder} />
          </View>

          {/* Comments List */}
          <FlatList
            data={comments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <CommentItem item={item} />}
            ListEmptyComponent={() => (
              <View style={styles.emptyCommentsContainer}>
                <Text style={styles.emptyCommentsText}>Chưa có bình luận</Text>
              </View>
            )}
            contentContainerStyle={styles.commentsList}
          />

          {/* Comment Input */}
          <View style={styles.commentInputContainer}>
            <Image 
              source={{ uri: 'https://scontent.fsgn5-3.fna.fbcdn.net/v/t39.30808-6/480681851_1843038753128474_8873796576016633436_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Ay-q9iTYjqMQ7kNvwERSrcX&_nc_oc=AdlLmpSpKAVUKaZu2XPDncMiodoItY-49xLkpiwDz3SC7d0AumbfyT8RD3iWdKQsCtg&_nc_zt=23&_nc_ht=scontent.fsgn5-3.fna&_nc_gid=M4yhnbpFX53mWI4v1LZc6Q&oh=00_AfLZOS4EzzLazs06gDk9P4hGRi4G-EDglGlgEIZkO1AkxQ&oe=682805AC' }} 
              style={styles.userAvatar} 
            />
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.commentInput}
                placeholder={`Bình luận cho ${postUser}`}
                placeholderTextColor="#8E8E8E"
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity 
                style={styles.sendButton}
                onPress={handleSendComment}
              >
                <MaterialIcons name="send" size={24} color="#10B981" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '75%',
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
  closeButton: {
    width: 40,
  },
  placeholder: {
    width: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#166534',
    textAlign: 'center',
  },
  commentsList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  commentAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentUser: {
    fontWeight: 'bold',
    color: '#262626',
    marginBottom: 4,
  },
  commentText: {
    color: '#262626',
    marginBottom: 4,
  },
  commentTime: {
    fontSize: 12,
    color: '#8E8E8E',
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  commentInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    fontSize: 16,
    color: '#262626',
  },
  sendButton: {
    marginLeft: 8,
  },
  emptyCommentsContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyCommentsText: {
    color: '#8E8E8E',
    fontSize: 16,
  },
});

export default CommentModal;