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
    Easing,
} from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { images } from '@/constants/images';

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [slideAnim] = useState(new Animated.Value(50)); // bắt đầu lệch phải 50px
    const [sendScale] = useState(new Animated.Value(1));
    const [confirmScale] = useState(new Animated.Value(1));
    const [backScale] = useState(new Animated.Value(1));

    useFocusEffect(
        React.useCallback(() => {
            slideAnim.setValue(50);
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 400,
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

    const handleSendResetLink = () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }
        setIsSending(true);
        setTimeout(() => {
            setIsSending(false);
            Alert.alert(
                'Success',
                'A password reset link has been sent to your email.',
                [{ text: 'OK' }],
                { cancelable: false }
            );
        }, 1500);
    };

    const handleConfirmCode = () => {
        if (!confirmationCode) {
            Alert.alert('Error', 'Please enter the confirmation code.');
            return;
        }
        setIsConfirming(true);
        setTimeout(() => {
            setIsConfirming(false);
            Alert.alert(
                'Success',
                'Your confirmation code has been verified.',
                [{ text: 'OK', onPress: () => router.back() }],
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
                                Forgot Your Password?
                            </Text>
                            <Text className="text-gray-700 mb-4">
                                Enter your email address below to receive a password reset link.
                            </Text>
                            {/* Email input */}
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
                            {/* Confirm Code input & Send button */}
                            <View className="flex-row w-full mb-4">
                                <View className="flex-1 flex-row items-center bg-white rounded-xl px-4 py-3 border border-gray-300">
                                    <MaterialIcons name="vpn-key" size={20} color="#888" />
                                    <TextInput
                                        placeholder="Confirm Code"
                                        placeholderTextColor="#888"
                                        value={confirmationCode}
                                        onChangeText={setConfirmationCode}
                                        className="flex-1 ml-2 text-base text-green-900"
                                    />
                                </View>
                                <Animated.View style={{ marginLeft: 8, transform: [{ scale: sendScale }] }}>
                                    <TouchableOpacity
                                        onPress={handleSendResetLink}
                                        disabled={!email || isSending}
                                        className={`py-3 px-4 rounded-xl items-center justify-center ${(!email || isSending) ? 'bg-yellow-300' : 'bg-yellow-400'}`}
                                        onPressIn={() => handlePressIn(sendScale)}
                                        onPressOut={() => handlePressOut(sendScale)}
                                    >
                                        {isSending ? (
                                            <ActivityIndicator color="#2e7d32" />
                                        ) : (
                                            <Text className="text-green-900 font-semibold ml-1">
                                                Send Code
                                            </Text>
                                        )}
                                    </TouchableOpacity>
                                </Animated.View>
                            </View>
                            {/* Buttons */}
                            <View className="flex-row w-full space-x-2">
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
                                <Animated.View style={{ flex: 1, transform: [{ scale: confirmScale }] }}>
                                    <TouchableOpacity
                                        onPress={handleConfirmCode}
                                        disabled={!confirmationCode || isConfirming}
                                        className={`${(!confirmationCode || isConfirming) ? 'bg-yellow-300' : 'bg-yellow-400'} py-3 rounded-xl items-center justify-center`}
                                        onPressIn={() => handlePressIn(confirmScale)}
                                        onPressOut={() => handlePressOut(confirmScale)}
                                    >
                                        {isConfirming ? (
                                            <ActivityIndicator color="#2e7d32" />
                                        ) : (
                                            <Text className="text-green-900 font-semibold">Confirm</Text>
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
