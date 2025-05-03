import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { images } from '@/constants/images'; // images.bg, images.logo

export default function LoginScreen() {
    return (
        <ImageBackground
            source={images.bg}
            className="flex-1 justify-center items-center px-6"
            resizeMode="cover"
        >
            <View className="bg-white/80 rounded-2xl p-6 w-full max-w-md">
                <Text className="text-3xl font-bold text-green-800 mb-2">Welcome to SmartGarden</Text>
                <Text className="text-gray-700 mb-4">Log in to manage your garden smartly</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor="#888"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-gray-300"
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry
                    className="bg-white rounded-xl px-4 py-3 mb-5 border border-gray-300"
                />

                <TouchableOpacity className="bg-yellow-400 py-3 rounded-xl">
                    <Text className="text-center text-green-900 font-semibold">Log In</Text>
                </TouchableOpacity>
            </View>

            {/* Subtitle */}
            <Text className=" text-green-950 font-semibold mt-6 text-sm opacity-80">
                ©2025 SmartGarden. Grow smart, live green.
            </Text>
        </ImageBackground>
    );
}
