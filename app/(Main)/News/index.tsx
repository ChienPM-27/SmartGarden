import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  StatusBar,
  Platform,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { mockLatestNews, mockRecommendedNews } from '@/components/types/NewTypes';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

interface NewsItem {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  source: string;
  publishedAt: string;
  category: string;
}

const NewsScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [recommendedNews, setRecommendedNews] = useState<NewsItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setLatestNews(mockLatestNews);
    setRecommendedNews(mockRecommendedNews);
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate fetching new data
    setTimeout(() => {
      setLatestNews(mockLatestNews); // Reset or update with new data in a real app
      setRecommendedNews(mockRecommendedNews);
      setRefreshing(false);
    }, 1000);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderLatestNewsItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity style={styles.latestNewsCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.latestNewsImage} />
      <View style={styles.latestNewsContent}>
        <Text style={styles.latestNewsTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.latestNewsDescription} numberOfLines={3}>
          {item.description}
        </Text>
        <View style={styles.latestNewsFooter}>
          <Text style={styles.newsSource}>{item.source}</Text>
          <Text style={styles.newsDate}>{formatDate(item.publishedAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderRecommendedNewsItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity style={styles.recommendedNewsCard}>
      <Image source={{ uri: item.imageUrl }} style={styles.recommendedNewsImage} />
      <View style={styles.recommendedNewsContent}>
        <Text style={styles.recommendedNewsSource}>{item.source}</Text>
        <Text style={styles.recommendedNewsTitle} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={styles.recommendedNewsDate}>
          {formatDate(item.publishedAt)} • {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle={Platform.OS === 'ios' ? 'light-content' : 'dark-content'} />
      
      <LinearGradient colors={['#256dff', '#75d2f9']} style={styles.headerGradient}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => router.push('/(Main)/Home')}
            style={styles.backButton}
            accessibilityLabel="Go back"  
            accessibilityRole="button"
          >
            <Feather name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <View style={styles.searchBarContainer}>
            <View style={styles.searchBar}>
              <Feather name="search" size={20} color="#666" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search garden news..."
                placeholderTextColor="#666"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Latest News Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest News</Text>
          <FlatList
            data={latestNews}
            renderItem={renderLatestNewsItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.latestNewsList}
          />
        </View>

        {/* Recommended News Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended for You</Text>
          <FlatList
            data={recommendedNews}
            renderItem={renderRecommendedNewsItem}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            contentContainerStyle={styles.recommendedNewsList}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default NewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerGradient: {
    // Padding moved to headerContainer
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  backButton: {
    marginRight: 15,
  },
  searchBarContainer: {
    flex: 1,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065F46',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  latestNewsList: {
    paddingLeft: 20,
  },
  latestNewsCard: {
    width: width * 0.75,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  latestNewsImage: {
    width: '100%',
    height: 150,
  },
  latestNewsContent: {
    padding: 15,
  },
  latestNewsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 8,
    lineHeight: 22,
  },
  latestNewsDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  latestNewsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsSource: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '600',
  },
  newsDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  recommendedNewsList: {
    paddingHorizontal: 20,
  },
  recommendedNewsCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    overflow: 'hidden',
  },
  recommendedNewsImage: {
    width: 100,
    height: 100,
  },
  recommendedNewsContent: {
    flex: 1,
    padding: 15,
    justifyContent: 'space-between',
  },
  recommendedNewsSource: {
    fontSize: 12,
    color: '#4F46E5',
    fontWeight: '600',
    marginBottom: 4,
  },
  recommendedNewsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#065F46',
    lineHeight: 20,
    marginBottom: 8,
  },
  recommendedNewsDate: {
    fontSize: 12,
    color: '#9CA3AF',
  },
});