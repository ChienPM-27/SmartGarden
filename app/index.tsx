import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@/constants/images';
import { StatusBar } from 'expo-status-bar';

export default function IntroScreen() {
    const router = useRouter();

    const handleStart = () => {
        router.replace('/(tabs)/login');
    };

    return (
        <ImageBackground
            source={images.bg}
            className="flex-1 justify-center items-center px-6"
            resizeMode="cover"
        >
            <View className="bg-white/85 rounded-2xl p-8 items-center w-full max-w-[360px]">
                <StatusBar style="dark" />
                <Text className="text-4xl font-bold text-green-800 mb-4">
                    SmartGarden
                </Text>
                <Text className="text-base text-gray-700 mb-6 text-center leading-relaxed">
                    AI-powered gardening app that helps you manage plants,
                    explore knowledge, get farming news & track your growth.
                </Text>

                <TouchableOpacity
                    onPress={handleStart}
                    className="bg-yellow-400 px-6 py-3 rounded-xl"
                >
                    <Text className="text-green-900 font-semibold text-lg">
                        Get Started
                    </Text>
                </TouchableOpacity>
            </View>

            <Text className="text-green-950 font-semibold mt-2 text-sm opacity-80">
                ©2025 SmartGarden. Grow smart, live green.
            </Text>
        </ImageBackground>
    );
}
