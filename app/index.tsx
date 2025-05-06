import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@/constants/images'; // đảm bảo đã khai báo images.bg

export default function IntroScreen() {
    const router = useRouter();

    const handleStart = () => {
        router.replace('/(tabs)/login'); // chuyển sang màn hình login
    };

    return (
        <ImageBackground
            source={images.bg}
            className="flex-1 justify-center items-center px-6"
            resizeMode="cover"
        >
            <View
                style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.85)',
                    borderRadius: 16,
                    padding: 32,
                    alignItems: 'center',
                    maxWidth: 360,
                    width: '100%',
                }}
            >
                <Text className="text-4xl font-bold text-green-800 mb-4">
                    SmartGarden
                </Text>
                <Text className="text-lg text-gray-700 mb-6 text-center">
                    Welcome to your smart gardening assistant.
                </Text>

                <TouchableOpacity
                    onPress={handleStart}
                    className="bg-yellow-400 px-6 py-3 rounded-xl"
                >
                    <Text className="text-green-900 font-semibold text-lg">Get Started</Text>
                </TouchableOpacity>
            </View>

            <Text className="text-green-950 font-semibold mt-3 text-sm opacity-80">
                ©2025 SmartGarden. Grow smart, live green.
            </Text>
        </ImageBackground>
    );
}
