import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ActionButtons = () => {
  return (
    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity style={styles.locationButton}>
        <Text style={styles.buttonText}>Add Location</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.scheduleButton}>
        <Text style={styles.scheduleButtonText}>Set Schedule</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.timezoneButton}>
        <Text style={styles.timezoneButtonText}>Set Timezone</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  locationButton: {
    backgroundColor: '#1D4ED8',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  scheduleButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  timezoneButton: {
    backgroundColor: '#D1D5DB',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 11,
  },
  scheduleButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 11,
  },
  timezoneButtonText: {
    color: '#374151',
    fontWeight: '600',
    fontSize: 11,
  },
});

export default ActionButtons;