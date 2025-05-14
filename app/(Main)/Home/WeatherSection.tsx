// app/(Main)/Home/WeatherSection.tsx - Integrated with weatherStack API
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, Platform, ActivityIndicator } from 'react-native';
import { UI, createShadow } from '@/components/Common/cross-platform/CrossPlatformUtils';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import { fetchWeather } from '@/components/services/weatherService';
import { StatusBar } from 'expo-status-bar';

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

  // Format time from "2023-05-14 11:24" to "11:24 AM"
  const formatTime = (timeString: string): string => {
    try {
      const dateTime = new Date(timeString);
      return dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return "Unknown time";
    }
  };

  useEffect(() => {
    const getWeatherData = async () => {
      try {
        setLoading(true);
        const data = await fetchWeather('Ho Chi Minh');
        setWeather(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        setError('Could not load weather data');
      } finally {
        setLoading(false);
      }
    };

    getWeatherData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#38BDF8" />
      </View>
    );
  }

  // Error state
  if (error) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#7DD3FC', '#38BDF8']} 
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.weatherContainer}
        >
          <Text style={styles.errorText}>{error}</Text>
        </LinearGradient>
      </View>
    );
  }

  // If we have data, show the weather
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <LinearGradient
        colors={['#7DD3FC', '#38BDF8']} 
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.weatherContainer}
      >
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>{weather?.current.temperature}°C</Text>
          <Text style={styles.time}>{weather?.location.localtime ? formatTime(weather.location.localtime) : 'Unknown time'}</Text>
        </View>

        <View style={styles.weatherInfoContainer}>
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={16} color="#FFFFFF" style={styles.locationIcon} />
            <Text style={styles.locationText}>{weather?.location.name || 'Unknown location'}</Text>
          </View>
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
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: UI.spacing.md,
    marginTop: UI.spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#7DD3FC',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.25,
        shadowRadius: 12,
      },
      android: {
        // Android specific shadow handling
        elevation: 6,
      },
    }),
  },
  weatherContainer: {
    padding: UI.spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: UI.borderRadius.large,
    overflow: 'hidden',
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
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: UI.spacing.md,
    marginTop: UI.spacing.md,
    backgroundColor: 'rgba(125, 211, 252, 0.2)',
    borderRadius: UI.borderRadius.large,
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