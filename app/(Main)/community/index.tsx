import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  FlatList, 
  StyleSheet 
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import NavigationBar from '@/components/Common/NavigationBar';
import StoryItem from './StoryItem';
import PostItem from './PostItem';
import PostModal from '@/components/Social/Post/PostModal';
import { Story, Post } from './types';

// Modified to include only the current user's story
const initialStories: Story[] = [
  { id: '1', user: 'Bạn', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', isCurrentUser: true },
];

const CommunityScreen = () => {
  const router = useRouter();
  const [stories] = useState<Story[]>(initialStories);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isPostModalVisible, setIsPostModalVisible] = useState(false);

  const handleCreatePost = (newPost: Omit<Post, 'id' | 'likes' | 'isLiked' | 'time'>) => {
    const postToAdd: Post = {
      ...newPost,
      id: (posts.length + 1).toString(),
      likes: 0,
      isLiked: false,
      time: 'Vừa xong'
    };
    
    setPosts(currentPosts => [postToAdd, ...currentPosts]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SmartGarden</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.addPostButton} 
            onPress={() => setIsPostModalVisible(true)}
          >
            <MaterialIcons name="add" size={24} color="#166534" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.push('./chat')}>
            <AntDesign name="message1" size={24} color="#166534" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stories */}
      <View>
        <FlatList
          data={stories}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.storiesList}
          contentContainerStyle={styles.storiesContainer}
          renderItem={({ item }) => <StoryItem item={item} />}
        />
      </View>
      
      {/* Posts */}
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => <PostItem item={item} />}
        ListEmptyComponent={() => (
          <View style={styles.emptyPostsContainer}>
            <Text style={styles.emptyPostsText}>Chưa có bài đăng</Text>
          </View>
        )}
        style={{ flex: 1 }}
      />
      
      {/* Post Modal */}
      <PostModal
        isVisible={isPostModalVisible}
        onClose={() => setIsPostModalVisible(false)}
        onPost={handleCreatePost}
      />
      
      {/* Navigation Bar */}
      <View style={styles.navigationBarContainer}>
        <NavigationBar />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addPostButton: {
    marginRight: 16,
    backgroundColor: '#E8E8E8',
    borderRadius: 20,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#166534',
  },
  contentContainer: {
    paddingBottom: 80,
  },
  storiesList: {
    backgroundColor: '#FFFFFF',
  },
  storiesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 8,
  },
  navigationBarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  emptyPostsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyPostsText: {
    fontSize: 16,
    color: '#8E8E8E',
  },
});

export default CommunityScreen;