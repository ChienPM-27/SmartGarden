// Cập nhật WeatherSection.tsx để sử dụng modal thay đổi location
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Platform, ActivityIndicator, TouchableOpacity } from 'react-native';
import { UI } from '@/components/Common/cross-platform/CrossPlatformUtils';
import { Feather } from '@expo/vector-icons';
import { fetchWeather } from '@/components/services/weatherService';
import { StatusBar } from 'react-native';
import ChangeLocationModal from '@/components/Weather/ChangLocationModal';

// Define weather data interface
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
    is_day: string;
  };
}

const WeatherSection = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState('Ho Chi Minh');
  const [isLocationModalVisible, setIsLocationModalVisible] = useState(false);

  // Format time from "2023-05-14 11:24" to "11:24 AM"
  const formatTime = (timeString: string): string => {
    try {
      const dateTime = new Date(timeString);
      return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return "Unknown time";
    }
  };

  const handleLocationChange = (newLocation: string) => {
    setCurrentLocation(newLocation);
    setLoading(true);
    fetchWeatherData(newLocation);
  };

  const fetchWeatherData = async (location: string) => {
    try {
      setLoading(true);
      const data = await fetchWeather(location);
      setWeather(data);
      setError(null);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Could not load weather data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData(currentLocation);
  }, []);

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFFFFF" />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <View style={styles.weatherContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  // If we have data, show the weather
  return (
    <View style={styles.container}>
      <View style={styles.weatherContainer}>
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{weather?.current.temperature}°C</Text>
          <Text style={styles.time}>{weather?.location.localtime ? formatTime(weather.location.localtime) : 'Unknown time'}</Text>
        </View>

        <View style={styles.weatherInfoContainer}>
          <TouchableOpacity 
            style={styles.locationRow}
            onPress={() => setIsLocationModalVisible(true)}
          >
            <Feather name="map-pin" size={16} color="#FFFFFF" style={styles.locationIcon} />
            <Text style={styles.locationText}>{weather?.location.name || 'Unknown location'}</Text>
            <Feather name="chevron-down" size={16} color="#FFFFFF" style={{marginLeft: 4}} />
          </TouchableOpacity>
          <Text style={styles.weatherText}>{weather?.current.weather_descriptions?.[0] || 'Unknown'}</Text>
          <View style={styles.tempRangeContainer}>
            <Feather name="droplet" size={14} color="#FFFFFF" />
            <Text style={styles.tempText}>{weather?.current.humidity || 0}%</Text>
            <Feather name="wind" size={14} color="#FFFFFF" style={styles.upArrow} />
            <Text style={styles.tempText}>{weather?.current.wind_speed || 0} km/h</Text>
          </View>
        </View>

        <View style={styles.weatherImageContainer}>
          {weather?.current.weather_icons && weather.current.weather_icons.length > 0 ? (
            <Image
              source={{ uri: weather.current.weather_icons[0] }}
              style={styles.weatherImage}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={{ uri: "/api/placeholder/80/80" }}
              style={styles.weatherImage}
              resizeMode="cover"
            />
          )}
        </View>
      </View>

      <ChangeLocationModal
        visible={isLocationModalVisible}
        onClose={() => setIsLocationModalVisible(false)}
        onLocationChange={handleLocationChange}
        currentLocation={currentLocation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: UI.spacing.md,
    marginTop: UI.spacing.md,
  },
  weatherContainer: {
    padding: UI.spacing.sm,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  temperatureContainer: {
    flex: 1,
  },
  temperature: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
  },
  time: {
    fontSize: UI.fontSize.lg,
    color: '#fff',
    marginTop: 4,
  },
  weatherInfoContainer: {
    flex: 1,
    marginTop: UI.spacing.sm,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    marginRight: 4,
  },
  locationText: {
    fontSize: UI.fontSize.lg,
    color: '#fff',
    fontWeight: 'bold',
  },
  weatherText: {
    fontSize: UI.fontSize.md,
    color: '#fff',
    marginTop: 2,
  },
  tempRangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  tempText: {
    fontSize: UI.fontSize.md,
    color: '#fff',
    marginHorizontal: 2,
  },
  upArrow: {
    marginLeft: UI.spacing.sm,
  },
  highLowText: {
    fontSize: UI.fontSize.md,
    color: '#fff',
  },
  weatherImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.5,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  weatherImage: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: UI.spacing.md,
    marginTop: UI.spacing.md,
  },
  errorText: {
    fontSize: UI.fontSize.lg,
    color: '#fff',
    textAlign: 'center',
    flex: 1,
    padding: UI.spacing.lg,
  }
});

export default WeatherSection;