import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NavigationBar() {
    const router = useRouter();

    const handleNavigateHome = () => {
        router.push('/(Main)/Home');
    };

    const handleNavigateMyPlant = () => {
        router.push('/(Main)/my-plants');
    };

    const handleNavigateSetting = () => {
        router.push('/(Main)/setting');
    };

    const handleNavigateChatBox = () => {
        router.push('/(Main)/chat-box');
    };

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleNavigateHome}>
                <MaterialIcons name="home" style={{left : 8, fontSize : 30}} size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigateMyPlant}>
                <MaterialIcons name="list" style={{left : 20, fontSize : 30}} size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>My Plants</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigateChatBox}>
                <MaterialIcons name="chat" style={{left : 17, fontSize : 30}} size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>ChatBox</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNavigateSetting}>
                <MaterialIcons name="settings" style={{left : 15, fontSize : 30}} size={24} color="#FFFFFF" />
                <Text style={styles.buttonText}>Settings</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#10B981',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 20,  // Giảm padding để đưa thanh lên cao hơn
        paddingHorizontal: 15,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 5, // For Android shadow
        shadowColor: '#000', // For iOS shadow
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        marginBottom: 10,  // Tạo khoảng cách từ dưới màn hình
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: 5,
    },
    icon: {
      color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: 5,
    },
});
