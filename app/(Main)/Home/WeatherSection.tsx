// app/(Main)/Home/WeatherSection.tsx - Improved version
import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { UI, createShadow } from '@/components/Common/CrossPlatformUtils';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const WeatherSection = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#7DD3FC', '#38BDF8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.weatherContainer}
      >
        <View style={styles.temperatureContainer}>
          <Text style={styles.temperature}>24°C</Text>
          <Text style={styles.time}>11:24 AM</Text>
        </View>

        <View style={styles.weatherInfoContainer}>
          <View style={styles.locationRow}>
            <Feather name="map-pin" size={16} color="#FFFFFF" style={styles.locationIcon} />
            <Text style={styles.locationText}>HCMC</Text>
          </View>
          <Text style={styles.weatherText}>Cloudy</Text>
          <View style={styles.tempRangeContainer}>
            <Feather name="arrow-down" size={14} color="#FFFFFF" />
            <Text style={styles.tempText}>24°</Text>
            <Feather name="arrow-up" size={14} color="#FFFFFF" style={styles.upArrow} />
            <Text style={styles.tempText}>33°</Text>
          </View>
        </View>

        <View style={styles.weatherImageContainer}>
          <Image
            source={{ uri: "/api/placeholder/80/80" }}
            style={styles.weatherImage}
            resizeMode="cover"
          />
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
});

export default WeatherSection;