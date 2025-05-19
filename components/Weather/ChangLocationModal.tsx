import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  TextInput, 
  TouchableOpacity, 
  Animated, 
  Dimensions,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface ChangeLocationModalProps{
  visible: boolean;
  onClose: () => void;
  onLocationChange: (location: string) => void;
  currentLocation: string;
}

const ChangeLocationModal: React.FC<ChangeLocationModalProps> = ({
  visible,
  onClose,
  onLocationChange,
  currentLocation,
}) => {
  const [location, setLocation] = useState('');
  const slideAnim = useRef(new Animated.Value(-Dimensions.get('window').width)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setLocation(currentLocation || '');
      // Animation when opening
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      // Reset animation when closing
      slideAnim.setValue(-Dimensions.get('window').width);
      fadeAnim.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(slideAnim, {
      toValue: -Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  const handleSubmit = () => {
    if (location.trim()) {
      onLocationChange(location.trim());
      handleClose();
    }
  };

  const popularLocations = [
    'Ho Chi Minh', 'Hanoi', 'Da Nang',
    'London', 'New York', 'Paris', 'Tokyo'
  ];

  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={handleClose}
    >
      <View style={styles.container}>
        <Animated.View 
          style={[styles.overlay, { opacity: fadeAnim }]}
          onTouchEnd={handleClose}
        />
        
        <Animated.View
          style={[
            styles.modalContent,
            { transform: [{ translateX: slideAnim }] }
          ]}
        >
          <LinearGradient
            colors={['#256dff', '#75d2f9']}
            style={styles.gradientHeader}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.headerTitle}>Change Location</Text>
              <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                <Feather name="x" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <View style={styles.modalBody}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
              style={styles.keyboardAvoidingContent}
            >
              <View style={styles.scrollContent}>
                <View style={styles.searchContainer}>
                  <Feather name="search" size={18} color="#777" style={styles.searchIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Enter city name"
                    value={location}
                    onChangeText={setLocation}
                    placeholderTextColor="#999"
                    autoFocus
                  />
                  {location.length > 0 && (
                    <TouchableOpacity onPress={() => setLocation('')} style={styles.clearButton}>
                      <Feather name="x-circle" size={16} color="#777" />
                    </TouchableOpacity>
                  )}
                </View>

                <Text style={styles.sectionTitle}>Popular Locations</Text>
                <View style={styles.popularLocationsContainer}>
                  {popularLocations.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.locationChip}
                      onPress={() => setLocation(item)}
                    >
                      <Feather name="map-pin" size={12} color="#3b82f6" style={styles.chipIcon} />
                      <Text style={styles.locationChipText}>{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </KeyboardAvoidingView>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
                disabled={!location.trim()}
              >
                <Text style={styles.submitButtonText}>Update Location</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxWidth: 400,
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
    alignSelf: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  gradientHeader: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  closeButton: {
    padding: 4,
  },
  modalBody: {
    flex: 1,
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  keyboardAvoidingContent: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  popularLocationsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  locationChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f7ff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e7ff',
  },
  chipIcon: {
    marginRight: 4,
  },
  locationChipText: {
    fontSize: 12,
    color: '#3b82f6',
  },
  buttonContainer: {
    width: '100%',
    marginTop: 5,
  },
  submitButton: {
    backgroundColor: '#1D4ED8',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
    width: '100%',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ChangeLocationModal;