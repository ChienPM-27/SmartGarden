// screens/HomeScreen.tsx
import React from 'react';
import { View } from 'react-native';
import WeatherComponent from '@/components/Weather/weatherComponent';  // Đảm bảo đường dẫn đúng

const HomeScreen = () => {
    return (
        <View className="flex-1 bg-white p-4">  {/* Thêm padding để đẹp mắt hơn */}
            <WeatherComponent />  {/* Thêm WeatherComponent vào màn hình chính */}
        </View>
    );
};

export default HomeScreen;
