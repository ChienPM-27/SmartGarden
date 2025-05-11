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
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { images } from '@/constants/images';

export default function CreateAccountScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const handleCreateAccount = () => {
        if (!username || !email || !password) {
            Alert.alert('Incomplete', 'Please fill in all fields');
            return;
        }

        setIsCreating(true);

        setTimeout(() => {
            console.log('Creating account for:', { username, email, password });

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
                    <View className="items-center">
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
                                <TouchableOpacity
                                    onPress={() => router.back()}
                                    className="flex-1 bg-gray-300 py-3 rounded-xl items-center justify-center mr-2"
                                >
                                    <Text className="text-gray-800 font-semibold">Back</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleCreateAccount}
                                    disabled={!username || !email || !password || isCreating}
                                    className={`flex-1 py-3 rounded-xl items-center justify-center ${(!username || !email || !password || isCreating) ? 'bg-yellow-300' : 'bg-yellow-400'}`}
                                >
                                    {isCreating ? (
                                        <ActivityIndicator color="#2e7d32" />
                                    ) : (
                                        <Text className="text-green-900 font-semibold">
                                            Create Account
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <Text className="text-green-950 font-semibold mt-3 text-sm opacity-80">
                            ©2025 SmartGarden. Grow smart, live green.
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ImageBackground>
    );
}
