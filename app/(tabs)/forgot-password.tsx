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
} from 'react-native';
import { useRouter } from 'expo-router';
import { images } from '@/constants/images'; // images.bg

export default function ForgotPassword() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');

    const handleSendResetLink = () => {
        if (!email) {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }

        // Simulate sending password reset link logic here
        console.log('Sending password reset link to:', email);

        Alert.alert(
            'Success',
            'A password reset link has been sent to your email.',
            [
                {
                    text: 'OK',
                    onPress: () => {},
                }
            ],
            { cancelable: false }
        );
    };

    const handleConfirmCode = () => {
        if (!confirmationCode) {
            Alert.alert('Error', 'Please enter the confirmation code.');
            return;
        }

        // Simulate confirming the code logic here
        console.log('Confirming code:', confirmationCode);

        Alert.alert(
            'Success',
            'Your confirmation code has been verified.',
            [
                {
                    text: 'OK',
                    onPress: () => router.back(),
                }
            ],
            { cancelable: false }
        );
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
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                            Forgot Your Password?
                        </Text>
                        <Text className="text-gray-700 mb-4">
                            Enter your email address below to receive a password reset link.
                        </Text>

                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="bg-white rounded-xl px-4 py-3 mb-3 border border-gray-300"
                        />

                        <View style={{ flexDirection: 'row', width: '100%', marginBottom: 12 }}>
                            <TextInput
                                placeholder="Confirm Code"
                                placeholderTextColor="#888"
                                value={confirmationCode}
                                onChangeText={setConfirmationCode}
                                className="bg-white rounded-xl px-4 py-3 border border-gray-300"
                                style={{ flex: 3, marginRight: 8 }} // 2/3 of the width
                            />
                            <TouchableOpacity
                                onPress={handleSendResetLink}
                                className="bg-yellow-400 py-3 rounded-xl items-center justify-center"
                                style={{ flex: 2 }} // 1/3 of the width
                            >
                                <Text className="text-green-900 font-semibold">
                                    Send Code
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={{ flexDirection: 'row', width: '100%' }}>
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="bg-yellow-400 py-3 rounded-xl items-center justify-center"
                                style={{ flex: 1, marginRight: 8 }}
                            >
                                <Text className="text-green-900 font-semibold">Back</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleConfirmCode}
                                className="bg-yellow-400 py-3 rounded-xl items-center justify-center"
                                style={{ flex: 3 }}
                            >
                                <Text className="text-green-900 font-semibold">Confirm</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

            <Text className="text-green-950 font-semibold mt-2 text-sm opacity-80">
                ©2025 SmartGarden. Grow smart, live green.
            </Text>
        </ImageBackground>
    );
}

