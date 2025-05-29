import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerGradient: {
    paddingBottom: 20,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
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

export default styles;
