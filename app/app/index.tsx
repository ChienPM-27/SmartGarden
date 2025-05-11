import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { images } from '@/constants/images';

export default function IntroScreen() {
    const router = useRouter();

    const handleStart = () => {
        router.replace('/(tabs)/login');
    };

    return (
        <ImageBackground
            source={images.bg} // Giữ ảnh nền ở đây
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 }}
            resizeMode="cover"
        >
            <Animated.View 
                entering={FadeIn} // Animation khi xuất hiện
                exiting={FadeOut} // Animation khi biến mất
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', borderRadius: 24, padding: 16, width: '100%', maxWidth: 360, alignItems: 'center' }}
            >
                <StatusBar style="dark" />
                <Text style={{ fontSize: 32, fontWeight: 'bold', color: '#388E3C', marginBottom: 16 }}>
                    SmartGarden
                </Text>
                <Text style={{ fontSize: 14, color: '#616161', marginBottom: 24, textAlign: 'center', lineHeight: 20 }}>
                    AI-powered gardening app that helps you manage plants, explore knowledge, get farming news & track your growth.
                </Text>

                <TouchableOpacity
                    onPress={handleStart}
                    style={{ backgroundColor: '#FFEB3B', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12 }}
                >
                    <Text style={{ color: '#388E3C', fontWeight: '600', fontSize: 16 }}>
                        Get Started
                    </Text>
                </TouchableOpacity>
            </Animated.View>

            <Text style={{ color: '#388E3C', fontWeight: '600', marginTop: 16, fontSize: 12, opacity: 0.8 }}>
                ©2025 SmartGarden. Grow smart, live green.
            </Text>
        </ImageBackground>
    );
}
