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
    Animated,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import apiService from '@/components/services/api/apiServices'; // Import API service

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [fadeAnim] = useState(new Animated.Value(0));
    const [loginScale] = useState(new Animated.Value(1));
    const [createScale] = useState(new Animated.Value(1));
    const [forgotScale] = useState(new Animated.Value(1));

    React.useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
        }).start();

        // Check if user is already logged in
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        const isAuth = await apiService.isAuthenticated();
        if (isAuth) {
            router.replace('/(Main)/Home');
        }
    };

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

    const handleNavigateCreateAccount = () => {
        setEmail('');
        setPassword('');
        setErrorMessage('');
        router.push('/create-account');
    };

    const handleNavigateForgotPassword = () => {
        setEmail('');
        setPassword('');
        setErrorMessage('');
        router.push('/forgot-password');
    };

    const validateInputs = () => {
        if (!email || !password) {
            setErrorMessage('Please enter both username and password.');
            return false;
        }

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters.');
            return false;
        }

        return true;
    };

    const handleNavigateLogin = async () => {
        if (!validateInputs()) {
            return;
        }

        setErrorMessage('');
        setIsLoggingIn(true);

        try {
            console.log('Attempting login for:', email);
            
            const result = await apiService.login(email, password);

            if (result.success) {
                // Save tokens
                const { accessToken, tokenType } = result.data;
                await apiService.saveTokens(accessToken, tokenType);
                
                console.log('Login successful, navigating to home...');
                
                // Clear form
                setEmail('');
                setPassword('');
                
                // Navigate to main screen
                router.replace('/(Main)/Home');
            } else {
                console.error('Login failed:', result.message);
                setErrorMessage(result.message || 'Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error('Login Error:', error);
            setErrorMessage('An error occurred. Please check your network connection and try again.');
        } finally {
            setIsLoggingIn(false);
        }
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
                    <Animated.View style={{ opacity: fadeAnim }} className="items-center">
                        <View
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.85)',
                                borderRadius: 16,
                                padding: 24,
                                width: '100%',
                                maxWidth: 400,
                            }}
                        >
                            <Text className="text-3xl font-bold text-green-800 mb-2">
                                Welcome to SmartGarden
                            </Text>
                            <Text className="text-gray-700 mb-4">
                                Log in to manage your smart garden
                            </Text>

                            {/* Username input with icon */}
                            <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-3 border border-gray-300">
                                <MaterialIcons name="person" size={20} color="#888" />
                                <TextInput
                                    placeholder="Username"
                                    placeholderTextColor="#888"
                                    value={email}
                                    onChangeText={(text) => {
                                        setEmail(text.trim());
                                        setErrorMessage('');
                                    }}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    editable={!isLoggingIn}
                                    className="flex-1 ml-2 text-base"
                                />
                            </View>

                            {/* Password input with icon and show/hide */}
                            <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-5 border border-gray-300">
                                <MaterialIcons name="lock" size={20} color="#888" />
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor="#888"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={(text) => {
                                        setPassword(text);
                                        setErrorMessage('');
                                    }}
                                    editable={!isLoggingIn}
                                    className="flex-1 ml-2 text-base"
                                />
                                <TouchableOpacity 
                                    onPress={() => setShowPassword(!showPassword)}
                                    disabled={isLoggingIn}
                                >
                                    <MaterialIcons
                                        name={showPassword ? 'visibility-off' : 'visibility'}
                                        size={20}
                                        color={isLoggingIn ? "#ccc" : "#888"}
                                    />
                                </TouchableOpacity>
                            </View>

                            {errorMessage ? (
                                <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                                    <Text className="text-red-600 text-center">{errorMessage}</Text>
                                </View>
                            ) : null}

                            <Animated.View style={{ transform: [{ scale: loginScale }] }}>
                                <TouchableOpacity
                                    className={`py-3 rounded-xl ${(!email || !password || isLoggingIn) ? 'bg-yellow-200' : 'bg-yellow-400'}`}
                                    disabled={!email || !password || isLoggingIn}
                                    onPress={handleNavigateLogin}
                                    onPressIn={() => !isLoggingIn && handlePressIn(loginScale)}
                                    onPressOut={() => !isLoggingIn && handlePressOut(loginScale)}
                                >
                                    <Text className="text-center text-green-900 font-semibold">
                                        {isLoggingIn ? 'Logging in...' : 'Log In'}
                                    </Text>
                                </TouchableOpacity>
                            </Animated.View>

                            <View className="flex-row justify-between mt-4">
                                <Animated.View style={{ transform: [{ scale: createScale }] }}>
                                    <TouchableOpacity
                                        onPress={handleNavigateCreateAccount}
                                        onPressIn={() => handlePressIn(createScale)}
                                        onPressOut={() => handlePressOut(createScale)}
                                        disabled={isLoggingIn}
                                    >
                                        <Text className={`font-semibold ${isLoggingIn ? 'text-gray-400' : 'text-green-800'}`}>
                                            Create account
                                        </Text>
                                    </TouchableOpacity>
                                </Animated.View>
                                <Animated.View style={{ transform: [{ scale: forgotScale }] }}>
                                    <TouchableOpacity
                                        onPress={handleNavigateForgotPassword}
                                        onPressIn={() => handlePressIn(forgotScale)}
                                        onPressOut={() => handlePressOut(forgotScale)}
                                        disabled={isLoggingIn}
                                    >
                                        <Text className={`font-semibold ${isLoggingIn ? 'text-gray-400' : 'text-green-800'}`}>
                                            Forgot password?
                                        </Text>
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