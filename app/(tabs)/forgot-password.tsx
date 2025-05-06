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

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [isSending, setIsSending] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    const handleSendResetLink = () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }

        setIsSending(true);

        setTimeout(() => {
            console.log('Sending password reset link to:', email);
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
            console.log('Confirming code:', confirmationCode);
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
                                {/* Confirm Code Input */}
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

                                {/* Khoảng trống nhỏ: ml-2 hoặc style={{ marginLeft: 8 }} */}
                                <TouchableOpacity
                                    onPress={handleSendResetLink}
                                    disabled={!email || isSending}
                                    className={`ml-2 py-3 px-4 rounded-xl items-center justify-center ${
                                        (!email || isSending) ? 'bg-yellow-300' : 'bg-yellow-400'
                                    }`}
                                >
                                    {isSending ? (
                                        <ActivityIndicator color="#2e7d32" />
                                    ) : (
                                        <Text className="text-green-900 font-semibold ml-1">
                                            Send Code
                                        </Text>
                                    )}
                                </TouchableOpacity>
                            </View>


                            {/* Buttons */}
                            <View className="flex-row w-full space-x-2">
                                <TouchableOpacity
                                    onPress={() => router.back()}
                                    className="flex-1 bg-gray-300 py-3 rounded-xl items-center justify-center mr-2"
                                >
                                    <Text className="text-gray-800 font-semibold">Back</Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={handleConfirmCode}
                                    disabled={!confirmationCode || isConfirming}
                                    className={`flex-3 flex-1 py-3 rounded-xl items-center justify-center ${(!confirmationCode || isConfirming) ? 'bg-yellow-300' : 'bg-yellow-400'}`}
                                >
                                    {isConfirming ? (
                                        <ActivityIndicator color="#2e7d32" />
                                    ) : (
                                        <Text className="text-green-900 font-semibold">Confirm</Text>
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
