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
        <View className="flex-1 items-center justify-center p-4">
            {weather && (
                <View className="bg-white p-6 rounded-2xl shadow-lg items-center w-5/6">
                    <Text className="text-3xl font-bold text-gray-800 mb-2">
                        {weather.location.name}, {weather.location.country}
                    </Text>
                    <Image
                        source={{ uri: weather.current.weather_icons[0] }}
                        style={{ width: 100, height: 100, marginVertical: 10 }}
                    />
                    <Text className="text-2xl text-gray-700 mb-1">
                        🌡️ {weather.current.temperature}°C - {weather.current.weather_descriptions[0]}
                    </Text>
                    <Text className="text-base text-gray-600 mb-1">
                        💧 Độ ẩm: {weather.current.humidity}%
                    </Text>
                    <Text className="text-base text-gray-600 mb-1">
                        💨 Tốc độ gió: {weather.current.wind_speed} km/h
                    </Text>
                    <Text className="text-base text-gray-600">
                        🌡️ Cảm giác: {weather.current.feelslike}°C
                    </Text>
                </View>
            )}
        </View>
    );
};

export default WeatherComponent;
