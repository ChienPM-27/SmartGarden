import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Post } from './types';

const PostItem: React.FC<{ item: Post }> = ({ item }) => (
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
        <TouchableOpacity style={styles.actionBtn}>
          <MaterialIcons name={item.isLiked ? "favorite" : "favorite-border"} size={26} color={item.isLiked ? "#F43F5E" : "#262626"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <MaterialIcons name="chat-bubble-outline" size={24} color="#262626" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <MaterialIcons name="send" size={24} color="#262626" />
        </TouchableOpacity>
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
    <Text style={styles.postTime}>{item.time}</Text>
  </View>
);

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
  actionBtn: {
    marginRight: 16,
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
});

export default PostItem;
