import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Story } from './types';

const StoryItem: React.FC<{ item: Story }> = ({ item }) => (
  <View style={styles.storyItem}>
    <View style={styles.storyAvatarContainer}>
      <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
      {item.isCurrentUser && (
        <View style={styles.addStoryButton}>
          <MaterialIcons name="add" size={14} color="#FFF" />
        </View>
      )}
    </View>
    <Text style={styles.storyUser} numberOfLines={1}>
      {item.isCurrentUser ? 'Tin của bạn' : item.user}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  storyItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 70,
  },
  storyAvatarContainer: {
    width: 68,
    height: 68,
    borderRadius: 34,
    padding: 2,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    position: 'relative',
  },
  storyAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  addStoryButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  storyUser: {
    fontSize: 12,
    marginTop: 4,
    color: '#4B5563',
    textAlign: 'center',
  },
});

export default StoryItem;
