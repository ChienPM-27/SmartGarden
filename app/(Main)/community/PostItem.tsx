import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CommentModal from '@/components/Social/Post/CommentModal';
import { Post, Comment } from '../../../components/types/SocialTypes';

const PostItem: React.FC<{ 
  item: Post, 
  onUpdatePost: (postId: string, updatedPost: Partial<Post>) => void 
}> = ({ item, onUpdatePost }) => {
  const [isCommentModalVisible, setIsCommentModalVisible] = useState(false);
  
  // Animation values for button press effects
  const [likeScale] = useState(new Animated.Value(1));
  const [commentScale] = useState(new Animated.Value(1));
  const [shareScale] = useState(new Animated.Value(1));

  // Handle button press in animations
  const handlePressIn = (scaleAnim: Animated.Value) => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scaleAnim: Animated.Value) => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  // Handle like functionality
  const handleLike = () => {
    const updatedLikes = item.isLiked 
      ? item.likes - 1 
      : item.likes + 1;
    
    onUpdatePost(item.id, { 
      isLiked: !item.isLiked, 
      likes: updatedLikes 
    });
  };

  const handleAddComment = (newComment: Omit<Comment, 'id'>) => {
    const commentToAdd: Comment = {
      ...newComment,
      id: (item.comments?.length || 0 + 1).toString()
    };

    const updatedComments = [...(item.comments || []), commentToAdd];
    
    onUpdatePost(item.id, { comments: updatedComments });
  };

  // Function to format large numbers
  const formatNumber = (num: number) => {
    return num > 999 ? `${Math.floor(num / 1000)}k` : num.toString();
  };

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.postAvatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.postUser}>{item.user}</Text>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="more-horiz" size={24} color="#4B5563" />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <Animated.View style={[styles.actionContainer, { transform: [{ scale: likeScale }] }]}>
            <TouchableOpacity 
              style={styles.actionBtn}
              onPress={handleLike}
              onPressIn={() => handlePressIn(likeScale)}
              onPressOut={() => handlePressOut(likeScale)}
            >
              <MaterialIcons 
                name={item.isLiked ? "favorite" : "favorite-border"} 
                size={26} 
                color={item.isLiked ? "#F43F5E" : "#262626"} 
              />
            </TouchableOpacity>
            {item.likes > 0 && (
              <Text style={styles.actionCount}>{formatNumber(item.likes)}</Text>
            )}
          </Animated.View>
          <Animated.View style={[styles.actionContainer, { transform: [{ scale: commentScale }] }]}>
            <TouchableOpacity 
              style={styles.actionBtn}
              onPress={() => setIsCommentModalVisible(true)}
              onPressIn={() => handlePressIn(commentScale)}
              onPressOut={() => handlePressOut(commentScale)}
            >
              <MaterialIcons name="chat-bubble-outline" size={24} color="#262626" />
            </TouchableOpacity>
            {item.comments && item.comments.length > 0 && (
              <Text style={styles.actionCount}>{formatNumber(item.comments.length)}</Text>
            )}
          </Animated.View>
          <Animated.View style={[styles.actionContainer, { transform: [{ scale: shareScale }] }]}>
            <TouchableOpacity 
              style={styles.actionBtn}
              onPressIn={() => handlePressIn(shareScale)}
              onPressOut={() => handlePressOut(shareScale)}
            >
              <MaterialIcons name="send" size={24} color="#262626" />
            </TouchableOpacity>
            {/* Assuming we want to track share count */}
            <Text style={styles.actionCount}>0</Text>
          </Animated.View>
        </View>
        <TouchableOpacity>
          <MaterialIcons name="bookmark-border" size={26} color="#262626" />
        </TouchableOpacity>
      </View>
      <Text style={styles.likesCount}>{item.likes} lượt thích</Text>
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>
          <Text style={styles.postUserCaption}>{item.user}</Text>{' '}
          {item.content}
        </Text>
      </View>
      {item.comments && item.comments.length > 0 && (
        <TouchableOpacity 
          style={styles.viewCommentsContainer}
          onPress={() => setIsCommentModalVisible(true)}
        >
          <Text style={styles.viewCommentsText}>
            Xem {item.comments.length} bình luận
          </Text>
        </TouchableOpacity>
      )}
      <Text style={styles.postTime}>{item.time}</Text>

      {/* Comment Modal */}
      <CommentModal
        isVisible={isCommentModalVisible}
        onClose={() => setIsCommentModalVisible(false)}
        postUser={item.user}
        comments={item.comments}
        onAddComment={handleAddComment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  postCard: {
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  postAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  postUser: {
    fontWeight: 'bold',
    color: '#262626',
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F5F5F5',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  actionBtn: {
    marginRight: 4,
  },
  actionCount: {
    color: '#262626',
    fontSize: 12,
  },
  likesCount: {
    fontWeight: 'bold',
    paddingHorizontal: 12,
    paddingBottom: 6,
    color: '#262626',
  },
  captionContainer: {
    paddingHorizontal: 12,
    paddingBottom: 8,
  },
  captionText: {
    color: '#262626',
    lineHeight: 18,
  },
  postUserCaption: {
    fontWeight: 'bold',
  },
  postTime: {
    fontSize: 12,
    color: '#8E8E8E',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  viewCommentsContainer: {
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  viewCommentsText: {
    color: '#8E8E8E',
  },
});

export default PostItem;