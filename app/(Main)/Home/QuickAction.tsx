import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const QuickActions = () => {
  return (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      
      <View style={styles.quickActionButtonsRow}>
        {/* Water Button */}
        <TouchableOpacity style={styles.quickActionButton}>
          <View style={[styles.iconContainer, styles.waterIconContainer]}>
            <Feather name="droplet" size={24} color="white" />
          </View>
          <Text style={styles.quickActionText}>Water</Text>
        </TouchableOpacity>

        {/* Add Plants Button */}
        <TouchableOpacity style={styles.quickActionButton}>
          <View style={[styles.iconContainer, styles.addPlantsIconContainer]}>
            <Feather name="plus" size={24} color="white" />
          </View>
          <Text style={styles.quickActionText}>Add plants</Text>
        </TouchableOpacity>

        {/* Fertilize Button */}
        <TouchableOpacity style={styles.quickActionButton}>
          <View style={[styles.iconContainer, styles.fertilizeIconContainer]}>
            <MaterialCommunityIcons name="tree" size={24} color="white" />
          </View>
          <Text style={styles.quickActionText}>Fertilize</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  quickActionsContainer: {
    backgroundColor: '#ECFDF5',
    paddingTop: 20,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#065F46',
    marginBottom: 15,
  },
  quickActionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  quickActionButton: {
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  waterIconContainer: {
    backgroundColor: '#7DD3FC',
  },
  addPlantsIconContainer: {
    backgroundColor: '#4ADE80',
  },
  fertilizeIconContainer: {
    backgroundColor: '#86EFAC',
  },
  quickActionText: {
    fontSize: 16,
    color: '#065F46',
    fontWeight: '500',
  },
});

export default QuickActions;