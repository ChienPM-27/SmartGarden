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

export default function CreateAccountScreen() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleCreateAccount = () => {
        // Kiểm tra thông tin người dùng
        if (!username || !email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Thực hiện logic tạo tài khoản ở đây
        console.log('Creating account for:', { username, email, password });

        // Xóa toàn bộ nội dung trong form
        setUsername('');
        setEmail('');
        setPassword('');

        // Hiện thông báo tạo thành công với nút OK, khi nhấn OK chuyển về trang trước đó
        Alert.alert(
            "Success",
            "Your account has been created successfully!",
            [
                {
                    text: "OK",
                    onPress: () => router.back()
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
                            Create Your Account
                        </Text>
                        <Text className="text-gray-700 mb-4">
                            Sign up to start managing your garden
                        </Text>

                        <TextInput
                            placeholder="Username"
                            placeholderTextColor="#888"
                            value={username}
                            onChangeText={setUsername}
                            className="bg-white rounded-xl px-4 py-3 mb-3 border border-gray-300"
                        />
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor="#888"
                            value={email}
                            onChangeText={setEmail}
                            className="bg-white rounded-xl px-4 py-3 mb-3 border border-gray-300"
                        />
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="#888"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            className="bg-white rounded-xl px-4 py-3 mb-5 border border-gray-300"
                        />

                        {/* Nút Back + Create Account nằm cùng hàng */}
                        <View className="w-full flex-row mt-2">
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="flex-1 bg-yellow-400 py-3 rounded-xl items-center justify-center"
                                style={{ marginRight: 8 }}
                            >
                                <Text className="text-green-900 font-semibold">Back</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleCreateAccount}
                                className="flex-1 bg-yellow-400 py-3 rounded-xl items-center justify-center"
                            >
                                <Text className="text-green-900 font-semibold">Create Account</Text>
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
