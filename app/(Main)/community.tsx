import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const mockStories = [
  { id: '1', user: 'Minh Chien', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', user: 'Lan Anh', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { id: '3', user: 'Hữu Phước', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { id: '4', user: 'Ngọc Mai', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: '5', user: 'Bảo Long', avatar: 'https://randomuser.me/api/portraits/men/5.jpg' },
];

const mockPosts = [
  { id: '1', user: 'Minh Chien', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', content: '🌱 Hôm nay mình vừa trồng thêm rau cải mới!', time: '2 phút trước', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { id: '2', user: 'Lan Anh', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', content: 'Ai có kinh nghiệm trồng dưa leo cho mình xin tips với ạ!', time: '10 phút trước', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { id: '3', user: 'Hữu Phước', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', content: 'Vườn nhà mình vừa thu hoạch cà chua 🍅', time: '30 phút trước', image: 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=400&q=80' },
];

const CommunityScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Instagram style */}
      <View style={styles.header}>
        <Text style={styles.logoText}>SmartGarden</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginRight: 16 }}>
            <MaterialIcons name="add-box" size={28} color="#166534" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="chat-bubble-outline" size={26} color="#166534" />
          </TouchableOpacity>
        </View>
      </View>
      {/* Stories */}
      <FlatList
        data={mockStories}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.storiesList}
        contentContainerStyle={{ paddingHorizontal: 12, paddingVertical: 8 }}
        renderItem={({ item }) => (
          <View style={styles.storyItem}>
            <Image source={{ uri: item.avatar }} style={styles.storyAvatar} />
            <Text style={styles.storyUser} numberOfLines={1}>{item.user}</Text>
          </View>
        )}
      />
      {/* Posts */}
      <FlatList
        data={mockPosts}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <View style={styles.postHeader}>
              <Image source={{ uri: item.avatar }} style={styles.postAvatar} />
              <View style={{ flex: 1 }}>
                <Text style={styles.postUser}>{item.user}</Text>
                <Text style={styles.postTime}>{item.time}</Text>
              </View>
              <TouchableOpacity>
                <MaterialIcons name="more-vert" size={22} color="#888" />
              </TouchableOpacity>
            </View>
            <Image source={{ uri: item.image }} style={styles.postImage} />
            <Text style={styles.postContent}>{item.content}</Text>
            <View style={styles.postActions}>
              <TouchableOpacity style={styles.actionBtn}>
                <MaterialIcons name="favorite-border" size={24} color="#10B981" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <MaterialIcons name="chat-bubble-outline" size={22} color="#10B981" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionBtn}>
                <MaterialIcons name="share" size={22} color="#10B981" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FDF4',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#D1FAE5',
    elevation: 2,
  },
  logoText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#166534',
    letterSpacing: 1,
  },
  storiesList: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#D1FAE5',
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 18,
    width: 64,
  },
  storyAvatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    borderColor: '#10B981',
    marginBottom: 4,
  },
  storyUser: {
    fontSize: 12,
    color: '#166534',
    maxWidth: 60,
    textAlign: 'center',
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 12,
    marginTop: 18,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
    overflow: 'hidden',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    paddingBottom: 0,
  },
  postAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  postUser: {
    fontWeight: 'bold',
    color: '#166534',
    fontSize: 15,
  },
  postTime: {
    color: '#6B7280',
    fontSize: 11,
  },
  postImage: {
    width: '100%',
    height: 220,
    backgroundColor: '#E5E7EB',
  },
  postContent: {
    fontSize: 15,
    color: '#212121',
    marginTop: 8,
    marginHorizontal: 12,
    marginBottom: 8,
  },
  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  actionBtn: {
    marginRight: 18,
  },
});

export default CommunityScreen;
