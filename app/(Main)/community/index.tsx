import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import NavigationBar from '@/components/Common/NavigationBar';
import StoryItem from './StoryItem';
import PostItem from './PostItem';
import { Story, Post } from './types';

const mockStories: Story[] = [
  { id: '1', user: 'Bạn', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', isCurrentUser: true },
  { id: '2', user: 'Minh Chien', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '3', user: 'Lan Anh', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '4', user: 'Hữu Phước', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '5', user: 'Ngọc Mai', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: '6', user: 'Bảo Long', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
];

const mockPosts: Post[] = [
  { id: '1', user: 'Minh Chien', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', content: '🌱 Hôm nay mình vừa trồng thêm rau cải mới! #VườnRauSạch #SmartGarden', time: '2 phút trước', image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80', likes: 24, isLiked: false },
  { id: '2', user: 'Lan Anh', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', content: 'Ai có kinh nghiệm trồng dưa leo cho mình xin tips với ạ! Cây của mình đang bị vàng lá 😢', time: '10 phút trước', image: 'https://images.unsplash.com/photo-1518977822534-7049a61ee0c2?auto=format&fit=crop&w=600&q=80', likes: 16, isLiked: true },
  { id: '3', user: 'Hữu Phước', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', content: 'Vườn nhà mình vừa thu hoạch cà chua 🍅 Mời mọi người ghé qua ăn cùng!', time: '30 phút trước', image: 'https://images.unsplash.com/photo-1592921870583-aeafb0639ffe?auto=format&fit=crop&w=600&q=80', likes: 42, isLiked: false },
];

const CommunityScreen = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>SmartGarden</Text>
        <TouchableOpacity onPress={() => router.push('/(Main)/chat-box')}>
          <AntDesign name="message1" size={24} color="#166534" />
        </TouchableOpacity>
      </View>

      {/* Stories */}
      <View>
        <FlatList
          data={mockStories}
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
        data={mockPosts}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => <PostItem item={item} />}
        style={{ flex: 1 }}
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
});

export default CommunityScreen;