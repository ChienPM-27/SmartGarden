import React, { useState, useRef, useEffect } from 'react';
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
    Image,
    StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface Message {
    id: string;
    text?: string;
    imageUri?: string;
    sender: 'user' | 'bot';
}

export default function App() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [pendingImage, setPendingImage] = useState<string | null>(null); // ảnh chờ gửi
    const flatListRef = useRef<FlatList<Message>>(null);
    const { imageUri } = useLocalSearchParams();
    const router = useRouter();

    // Khi nhận imageUri mới, lưu vào pendingImage
    useEffect(() => {
        if (imageUri) {
            const uri = Array.isArray(imageUri) ? imageUri[0] : imageUri;
            if (uri !== pendingImage) {
                setPendingImage(uri);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageUri]);

    const handleSend = async () => {
        if (!input.trim() && !pendingImage) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input || undefined,
            imageUri: pendingImage || undefined,
            sender: 'user',
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setPendingImage(null);
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

    const renderItem = ({ item }: { item: Message }) => {
        if (item.imageUri) {
            return (
                <View
                    style={[
                        {
                            alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
                            backgroundColor: item.sender === 'user' ? '#22c55e' : '#e5e7eb',
                            borderRadius: 16,
                            marginVertical: 4,
                            maxWidth: '80%',
                            padding: 4,
                        },
                    ]}
                >
                    <Image
                        source={{ uri: item.imageUri }}
                        style={{ width: 180, height: 180, borderRadius: 12 }}
                        resizeMode="cover"
                    />
                    {item.text ? (
                        <Text style={{ color: item.sender === 'user' ? '#fff' : '#000', marginTop: 8 }}>{item.text}</Text>
                    ) : null}
                </View>
            );
        }
        return (
            <View
                style={[
                    {
                        alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
                        backgroundColor: item.sender === 'user' ? '#22c55e' : '#e5e7eb',
                        borderRadius: 16,
                        marginVertical: 4,
                        maxWidth: '80%',
                        paddingHorizontal: 12,
                        paddingVertical: 8,
                    },
                ]}
            >
                <Text style={{ color: item.sender === 'user' ? '#fff' : '#000' }}>{item.text}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={[styles.container, { backgroundColor: '#f0fdf4' }]}> {/* Nền xanh nhạt hơn */}
            {/* Header Chat */}
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 14, backgroundColor: '#22c55e', borderBottomLeftRadius: 18, borderBottomRightRadius: 18, elevation: 2 }}>
                <TouchableOpacity onPress={() => router.push('/(Main)/Home')} style={{ marginRight: 10 }}>
                    <Ionicons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#fff', letterSpacing: 1 }}>SmartGarden Chat</Text>
            </View>
            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ padding: 14, paddingBottom: 80 }}
                showsVerticalScrollIndicator={false}
            />

            {loading && (
                <View style={{ alignSelf: 'flex-start', backgroundColor: '#e0e7ef', borderRadius: 16, margin: 8, padding: 10, flexDirection: 'row', alignItems: 'center' }}>
                    <ActivityIndicator size="small" color="#22c55e" style={{ marginRight: 8 }} />
                    <Text style={{ color: '#166534', fontStyle: 'italic' }}>SmartBot đang trả lời...</Text>
                </View>
            )}

            {/* Hàng chờ gửi ảnh */}
            {pendingImage && (
                <View style={{ alignSelf: 'flex-end', marginRight: 16, marginBottom: 8 }}>
                    <View style={{ position: 'relative' }}>
                        <Image
                            source={{ uri: pendingImage }}
                            style={{ width: 90, height: 90, borderRadius: 14, borderWidth: 2, borderColor: '#22c55e' }}
                        />
                        <TouchableOpacity
                            style={{ position: 'absolute', top: -8, right: -8, backgroundColor: '#fff', borderRadius: 12, padding: 2, elevation: 2 }}
                            onPress={() => setPendingImage(null)}
                        >
                            <Ionicons name="close-circle" size={22} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={90}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 10, borderTopWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#fff', borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
                    <TextInput
                        style={{ flex: 1, height: 48, borderRadius: 24, backgroundColor: '#f3f4f6', paddingHorizontal: 16, color: '#000', fontSize: 16, marginRight: 8, borderWidth: 1, borderColor: '#bbf7d0' }}
                        placeholder="Nhập câu hỏi..."
                        value={input}
                        onChangeText={setInput}
                        multiline
                        placeholderTextColor="#6ee7b7"
                    />
                    <TouchableOpacity onPress={handleSend} style={{ marginLeft: 4, backgroundColor: '#22c55e', borderRadius: 24, padding: 10 }} disabled={loading}>
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Ionicons name="send" size={22} color="#fff" />
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 0,
    },
});
