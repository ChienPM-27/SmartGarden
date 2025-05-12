import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ImageBackground,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    ActivityIndicator,
    Animated,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { images } from '@/constants/images';
import { Easing } from 'react-native';

export default function CreateAccountScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [createScale] = useState(new Animated.Value(1));
    const [backScale] = useState(new Animated.Value(1));
    const [slideAnim] = useState(new Animated.Value(-50)); // bắt đầu lệch trái giống forgot-password

    useFocusEffect(
        React.useCallback(() => {
            slideAnim.setValue(-50);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
                delay: 0,
                easing: Easing.out(Easing.exp),
                useNativeDriver: true,
            }).start();
        }, [slideAnim])
    );

    const handlePressIn = (scaleAnim: Animated.Value) => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };
    const handlePressOut = (scaleAnim: Animated.Value) => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const handleCreateAccount = () => {
        if (!username || !email || !password) {
            Alert.alert('Incomplete', 'Please fill in all fields');
            return;
        }
        setIsCreating(true);
        setTimeout(() => {
            setUsername('');
            setEmail('');
            setPassword('');
            setIsCreating(false);
            Alert.alert(
                "Success",
                "Your account has been created successfully!",
                [{ text: "OK", onPress: () => router.back() }],
                { cancelable: false }
            );
        }, 1500);
    };

    return (
        <ImageBackground
            source={images.bg}
            className="flex-1 justify-center items-center px-6"
            resizeMode="cover"
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ width: '100%' }}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <Animated.View style={{ transform: [{ translateX: slideAnim }] }} className="items-center">
                        <View
                            style={{
                                backgroundColor: 'rgba(255,255,255,0.9)',
                                borderRadius: 16,
                                padding: 24,
                                width: '100%',
                                maxWidth: 400,
                            }}
                        >
                            <Text className="text-3xl font-bold text-green-800 mb-2">
                                Create Your Account
                            </Text>
                            <Text className="text-gray-700 mb-4">
                                Sign up to start managing your garden
                            </Text>
                            {/* Username */}
                            <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-3 border border-gray-300">
                                <MaterialIcons name="person" size={20} color="#888" />
                                <TextInput
                                    placeholder="Username"
                                    placeholderTextColor="#888"
                                    value={username}
                                    onChangeText={setUsername}
                                    className="flex-1 ml-2 text-base text-green-900"
                                />
                            </View>
                            {/* Email */}
                            <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-3 border border-gray-300">
                                <MaterialIcons name="email" size={20} color="#888" />
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor="#888"
                                    value={email}
                                    onChangeText={setEmail}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    className="flex-1 ml-2 text-base text-green-900"
                                />
                            </View>
                            {/* Password */}
                            <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-5 border border-gray-300">
                                <MaterialIcons name="lock" size={20} color="#888" />
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor="#888"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                    className="flex-1 ml-2 text-base text-green-900"
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <MaterialIcons
                                        name={showPassword ? 'visibility-off' : 'visibility'}
                                        size={20}
                                        color="#888"
                                    />
                                </TouchableOpacity>
                            </View>
                            {/* Buttons */}
                            <View className="w-full flex-row mt-2">
                                <Animated.View style={{ flex: 1, marginRight: 8, transform: [{ scale: backScale }] }}>
                                    <TouchableOpacity
                                        onPress={() => router.back()}
                                        className="bg-gray-300 py-3 rounded-xl items-center justify-center"
                                        onPressIn={() => handlePressIn(backScale)}
                                        onPressOut={() => handlePressOut(backScale)}
                                    >
                                        <Text className="text-gray-800 font-semibold">Back</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                                <Animated.View style={{ flex: 1, transform: [{ scale: createScale }] }}>
                                    <TouchableOpacity
                                        onPress={handleCreateAccount}
                                        disabled={!username || !email || !password || isCreating}
                                        className={`${(!username || !email || !password || isCreating) ? 'bg-yellow-300' : 'bg-yellow-400'} py-3 rounded-xl items-center justify-center`}
                                        onPressIn={() => handlePressIn(createScale)}
                                        onPressOut={() => handlePressOut(createScale)}
                                    >
                                        {isCreating ? (
                                            <ActivityIndicator color="#2e7d32" />
                                        ) : (
                                            <Text className="text-green-900 font-semibold">
                                                Create Account
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                        </View>
                        <Text className="text-green-950 font-semibold mt-3 text-sm opacity-80">
                            ©2025 SmartGarden. Grow smart, live green.
                        </Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}
