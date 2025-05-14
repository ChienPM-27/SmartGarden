import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WeatherSection = () => {
  return (
    <View style={styles.weatherContainer}>
      <View style={styles.temperatureContainer}>
        <Text style={styles.temperature}>24°C</Text>
        <Text style={styles.time}>11:24 AM</Text>
      </View>

      <View style={styles.weatherInfoContainer}>
        <Text style={styles.locationText}>HCMC</Text>
        <Text style={styles.weatherText}>Cloudy</Text>
        <Text style={styles.highLowText}>L:24° H:33°</Text>
      </View>

      <View style={styles.weatherImageContainer}>
        <Image
          source={{ uri: "/api/placeholder/80/80" }}
          style={styles.weatherImage}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  weatherContainer: {
    backgroundColor: '#7DD3FC',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop : 20,
    borderRadius: 20,
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
    fontSize: 20,
    color: '#fff',
  },
  weatherInfoContainer: {
    flex: 1,
    marginTop: 10,
  },
  locationText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  weatherText: {
    fontSize: 18,
    color: '#fff',
  },
  highLowText: {
    fontSize: 16,
    color: '#fff',
  },
  weatherImageContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
  },
  weatherImage: {
    width: '100%',
    height: '100%',
  },
});

export default WeatherSection;