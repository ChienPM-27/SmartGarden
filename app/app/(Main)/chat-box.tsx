import React, { useState, useRef } from 'react';
import {
    SafeAreaView,
    TextInput,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
}

export default function App() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef<FlatList<Message>>(null);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: 'user',
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setLoading(true);

        const aiReply = await getAIResponse(input);

        const botMessage: Message = {
            id: Date.now().toString() + 'bot',
            text: aiReply,
            sender: 'bot',
        };

        setMessages((prev) => [...prev, botMessage]);
        setLoading(false);

        setTimeout(() => {
            flatListRef.current?.scrollToEnd({ animated: true });
        }, 300);
    };

    const getAIResponse = async (userText: string): Promise<string> => {
        await new Promise((r) => setTimeout(r, 1000));
        return `🌱 SmartBot trả lời: "${userText}"`;
    };

    const renderItem = ({ item }: { item: Message }) => (
        <View
            className={`px-4 py-2 my-1 rounded-xl max-w-[80%] ${
                item.sender === 'user' ? 'self-end bg-green-500' : 'self-start bg-gray-200'
            }`}
        >
            <Text className={item.sender === 'user' ? 'text-white' : 'text-black'}>
                {item.text}
            </Text>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-white">
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 10 }}
            />

            {loading && (
                <View className="px-4 py-2 self-start bg-gray-200 rounded-xl m-2">
                    <Text className="text-gray-500 italic">SmartBot đang trả lời...</Text>
                </View>
            )}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={90}
            >
                <View className="flex-row items-center px-4 py-2 border-t border-gray-200 bg-white">
                    <TextInput
                        className="flex-1 h-12 px-4 rounded-full bg-gray-100 text-base text-black"
                        placeholder="Nhập câu hỏi..."
                        value={input}
                        onChangeText={setInput}
                        multiline
                    />
                    <TouchableOpacity onPress={handleSend} className="ml-2">
                        {loading ? (
                            <ActivityIndicator size="small" color="#22c55e" />
                        ) : (
                            <Ionicons name="send" size={24} color="#22c55e" />
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
