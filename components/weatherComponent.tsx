// components/WeatherComponent.tsx
import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Image } from 'react-native';
import { fetchWeather } from '@/service/weatherService';

interface WeatherData {
    location: {
        name: string;
        country: string;
        region: string;
        localtime: string;
    };
    current: {
        temperature: number;
        weather_descriptions: string[];
        wind_speed: number;
        humidity: number;
        feelslike: number;
        weather_icons: string[];
    };
}

const WeatherComponent = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const data = await fetchWeather('Ho Chi Minh');
                setWeather(data);
            } catch (error) {
                console.error('Error fetching weather data:', error);
            } finally {
                setLoading(false);
            }
        };

        getWeatherData();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <View className="flex-1 items-center justify-center bg-white p-4">
            {weather && (
                <View className="items-center">
                    <Text className="text-xl font-bold">
                        Thời tiết tại {weather.location.name}, {weather.location.country}
                    </Text>
                    <Text className="text-lg">
                        Nhiệt độ: {weather.current.temperature}°C
                    </Text>
                    <Text className="text-lg">
                        Mô tả: {weather.current.weather_descriptions[0]}
                    </Text>
                    <Text className="text-lg">
                        Độ ẩm: {weather.current.humidity}%
                    </Text>
                    <Text className="text-lg">
                        Tốc độ gió: {weather.current.wind_speed} km/h
                    </Text>
                    <Text className="text-lg">
                        Cảm giác: {weather.current.feelslike}°C
                    </Text>
                    <Image
                        source={{ uri: weather.current.weather_icons[0] }}
                        style={{ width: 64, height: 64, marginTop: 10 }}
                    />
                </View>
            )}
        </View>
    );
};

export default WeatherComponent;
