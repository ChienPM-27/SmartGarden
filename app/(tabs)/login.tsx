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

export default function LoginScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
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
    }, []);

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
        setUsername('');
        setPassword('');
        setErrorMessage('');
        router.push('/create-account');
    };

    const handleNavigateForgotPassword = () => {
        setUsername('');
        setPassword('');
        setErrorMessage('');
        router.push('/forgot-password');
    };

    const handleNavigateLogin = () => {
        if (!username || !password) {
            setErrorMessage('Please enter both username and password.');
            return;
        }
        setErrorMessage('');
        setIsLoggingIn(true);

        // Simulate login delay
        setTimeout(() => {
            setIsLoggingIn(false);
            router.push('/(Main)/Home');
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
                                Log in to manage your garden smartly
                            </Text>

                            {/* Username input with icon */}
                            <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mb-3 border border-gray-300">
                                <MaterialIcons name="person" size={20} color="#888" />
                                <TextInput
                                    placeholder="Username"
                                    placeholderTextColor="#888"
                                    value={username}
                                    onChangeText={setUsername}
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
                                    onChangeText={setPassword}
                                    className="flex-1 ml-2 text-base"
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <MaterialIcons
                                        name={showPassword ? 'visibility-off' : 'visibility'}
                                        size={20}
                                        color="#888"
                                    />
                                </TouchableOpacity>
                            </View>

                            {errorMessage ? (
                                <Text className="text-red-600 mb-4">{errorMessage}</Text>
                            ) : null}

                            <Animated.View style={{ transform: [{ scale: loginScale }] }}>
                                <TouchableOpacity
                                    className={`py-3 rounded-xl ${(!username || !password || isLoggingIn) ? 'bg-yellow-200' : 'bg-yellow-400'}`}
                                    disabled={!username || !password || isLoggingIn}
                                    onPress={handleNavigateLogin}
                                    onPressIn={() => handlePressIn(loginScale)}
                                    onPressOut={() => handlePressOut(loginScale)}
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
                                    >
                                        <Text className="text-green-800 font-semibold">Create account</Text>
                                    </TouchableOpacity>
                                </Animated.View>
                                <Animated.View style={{ transform: [{ scale: forgotScale }] }}>
                                    <TouchableOpacity
                                        onPress={handleNavigateForgotPassword}
                                        onPressIn={() => handlePressIn(forgotScale)}
                                        onPressOut={() => handlePressOut(forgotScale)}
                                    >
                                        <Text className="text-green-800 font-semibold">Forgot password?</Text>
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
