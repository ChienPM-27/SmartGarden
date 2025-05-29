import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SAMPLE_PRODUCTS, Product } from '@/components/types/ProductTypes';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 overflow-hidden"
    style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 8,
      elevation: 3,
    }}
  >
    <View className="relative">
      <Image
        source={{ uri: product.image }}
        className="w-full h-40"
        resizeMode="cover"
      />
      <View className="absolute top-3 right-3">
        <TouchableOpacity className="bg-white/90 rounded-full p-2">
          <Ionicons name="heart-outline" size={18} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </View>

    <View className="p-3">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-base font-bold text-gray-900 flex-1 mr-2" numberOfLines={1}>
          {product.name}
        </Text>
        <Text className="text-lg font-bold text-blue-600">
          ${product.price}
        </Text>
      </View>

      <Text className="text-xs text-gray-600 mb-3" numberOfLines={2}>
        {product.description}
      </Text>

      <View className="flex-row justify-between items-center">
        <View className="bg-gray-100 px-2 py-1 rounded-full">
          <Text className="text-xs text-gray-600 font-medium">
            {product.category}
          </Text>
        </View>

        <TouchableOpacity className="bg-blue-600 px-3 py-2 rounded-full">
          <Text className="text-white text-xs font-semibold">Add</Text>
        </TouchableOpacity>
      </View>
    </View>
  </TouchableOpacity>
);

const MarketplaceScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const screenWidth = Dimensions.get('window').width;

  const categories = ['All', ...Array.from(new Set(SAMPLE_PRODUCTS.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const createSlug = (name: string): string => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  };

  const handleProductPress = (product: Product) => {
    try {
      const slug = createSlug(product.name);
      console.log('Navigating to product:', product.name, 'with slug:', slug); // Debug log
      
      router.push({
        pathname: '/(Main)/Market/product/[id]',
        params: { id: slug }
      });
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback navigation with product ID
      router.push({
        pathname: '/(Main)/Market/product/[id]',
        params: { id: product.id }
      });
    }
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <View style={{ width: '48%' }}>
      <ProductCard product={item} onPress={() => handleProductPress(item)} />
    </View>
  );

  const renderCategoryTab = (category: string) => (
    <TouchableOpacity
      key={category}
      onPress={() => setSelectedCategory(category)}
      className={`px-4 py-2 rounded-full mr-3 ${
        selectedCategory === category ? 'bg-blue-600' : 'bg-gray-100'
      }`}
    >
      <Text className={`font-medium ${
        selectedCategory === category ? 'text-white' : 'text-gray-600'
      }`}>
        {category}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center">
            <TouchableOpacity onPress={() => router.back()} className="mr-3">
              <Feather name="arrow-left" size={24} color="#111827" />
            </TouchableOpacity>
            <Text className="text-2xl font-bold text-gray-900">Marketplace</Text>
          </View>
          <View className="flex-row space-x-3">
            <TouchableOpacity className="p-2">
              <Feather name="filter" size={24} color="#6B7280" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 relative">
              <Feather name="shopping-cart" size={24} color="#6B7280" />
              <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
                <Text className="text-white text-xs font-bold">3</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View className="relative mb-4">
          <View className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Feather name="search" size={20} color="#9CA3AF" />
          </View>
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search products..."
            className="bg-gray-100 rounded-full py-3 pl-12 pr-4 text-gray-900"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Category Tabs */}
        <FlatList
          data={categories}
          renderItem={({ item }) => renderCategoryTab(item)}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 16 }}
        />
      </View>

      {/* Product List */}
      <View className="flex-1 px-4 pt-4">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-semibold text-gray-900">
            {filteredProducts.length} Products
          </Text>
          <TouchableOpacity className="flex-row items-center">
            <Text className="text-gray-600 mr-1">Sort by</Text>
            <Feather name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <FlatList
          key="two-columns"
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          ListEmptyComponent={() => (
            <View className="items-center justify-center py-20">
              <Feather name="search" size={48} color="#D1D5DB" />
              <Text className="text-gray-500 text-lg mt-4">No products found</Text>
              <Text className="text-gray-400 text-center mt-2">
                Try adjusting your search or filters
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default MarketplaceScreen;