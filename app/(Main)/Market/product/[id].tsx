import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Share, SafeAreaView, StatusBar } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { MaterialIcons, Feather } from '@expo/vector-icons';

import { SAMPLE_PRODUCTS } from '@/components/types/ProductTypes';

// Helper function để tạo slug consistent
const createSlug = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  console.log('Product ID from params:', id); // Debug log

  // Find product by slug or fallback to direct ID match
  const product = SAMPLE_PRODUCTS.find(p => {
    const slug = createSlug(p.name);
    return slug === id || p.id === id;
  });

  console.log('Found product:', product?.name); // Debug log

  const handleShare = async () => {
    if (!product) return;
    
    try {
      await Share.share({
        message: `Check out this product: ${product.name} - $${product.price}`,
        title: product.name,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    console.log('Add to cart:', product.name);
    // Add your cart logic here
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    console.log('Toggle favorite:', product.name);
    // Add your favorite logic here
  };

  const handleGoBack = () => {
    router.push('/(Main)/Market');
  };

  // Loading or error state
  if (!product) {
    return (
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar barStyle="dark-content" />
        
        {/* Header with back button */}
        <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
          <TouchableOpacity onPress={handleGoBack} className="mr-3">
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Product Details</Text>
        </View>

        <View className="flex-1 items-center justify-center px-4">
          <MaterialIcons name="error-outline" size={64} color="#EF4444" />
          <Text className="text-xl font-semibold text-gray-900 mt-4 mb-2">
            Product Not Found
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            The product you're looking for doesn't exist or has been removed.
          </Text>
          <TouchableOpacity
            onPress={handleGoBack}
            className="bg-blue-600 px-6 py-3 rounded-full"
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Get related products (same category, excluding current product)
  const relatedProducts = SAMPLE_PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={handleGoBack} className="mr-3">
            <Feather name="arrow-left" size={24} color="#111827" />
          </TouchableOpacity>
          <Text className="text-lg font-semibold">Product Details</Text>
        </View>
        
        <View className="flex-row space-x-3">
          <TouchableOpacity onPress={handleShare} className="p-2">
            <Feather name="share" size={20} color="#6B7280" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleToggleFavorite} className="p-2">
            <MaterialIcons name="favorite-border" size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Product Image */}
        <View className="px-4 pt-4">
          <Image
            source={{ uri: product.image }}
            className="w-full h-80 rounded-2xl mb-4"
            resizeMode="cover"
          />
        </View>

        {/* Product Info */}
        <View className="px-4">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="text-2xl font-bold text-gray-900 flex-1 mr-4">
              {product.name}
            </Text>
          </View>

          <Text className="text-3xl font-bold text-blue-600 mb-4">
            ${product.price}
          </Text>

          {/* Category */}
          <View className="bg-gray-100 self-start px-3 py-1 rounded-full mb-4">
            <Text className="text-sm text-gray-600 font-medium">
              {product.category}
            </Text>
          </View>

          {/* Description */}
          <Text className="text-lg font-semibold text-gray-900 mb-2">
            Description
          </Text>
          <Text className="text-gray-600 leading-6 mb-6">
            {product.description}
          </Text>

          {/* Action Buttons */}
          <View className="flex-row space-x-3 mb-8">
            <TouchableOpacity
              className="flex-1 py-4 rounded-2xl border-2 border-gray-200 items-center"
              onPress={handleShare}
            >
              <Text className="text-gray-700 font-semibold text-base">Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 py-4 rounded-2xl bg-blue-600 items-center"
              onPress={handleAddToCart}
            >
              <Text className="text-white font-semibold text-base">Add to Cart</Text>
            </TouchableOpacity>
          </View>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <>
              <Text className="text-xl font-bold text-gray-900 mb-4">
                Related Products
              </Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="mb-6"
                contentContainerStyle={{ paddingRight: 16 }}
              >
                {relatedProducts.map((relatedProduct) => (
                  <TouchableOpacity
                    key={relatedProduct.id}
                    className="w-40 mr-4 bg-gray-50 rounded-xl overflow-hidden"
                    onPress={() => {
                      const slug = createSlug(relatedProduct.name);
                      router.push({
                        pathname: '/(Main)/Market/product/[id]',
                        params: { id: slug }
                      });
                    }}
                  >
                    <Image
                      source={{ uri: relatedProduct.image }}
                      className="w-full h-32"
                      resizeMode="cover"
                    />
                    <View className="p-3">
                      <Text className="font-semibold text-gray-900 mb-1" numberOfLines={2}>
                        {relatedProduct.name}
                      </Text>
                      <Text className="text-blue-600 font-bold">
                        ${relatedProduct.price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailScreen;