// services/weatherService.ts
import axios from 'axios';
import { WEATHER_API_KEY, WEATHER_API_URL } from '@/service/weatherStack';

export const fetchWeather = async (location: string) => {
    try {
        const response = await axios.get(
            `${WEATHER_API_URL}?access_key=${WEATHER_API_KEY}&query=${location}`
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        throw error;
    }
};
