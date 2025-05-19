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
    Alert,
    Animated,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { getAIResponse } from '@/components/services/geminiService';
import styles from './chatbox.styles';
import { StatusBar } from 'expo-status-bar';

interface Message {
    id: string;
    text?: string;
    imageUri?: string;
    sender: 'user' | 'bot';
    timestamp: number;
}

const formatTime = (timestamp: number): string => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const formatBotResponse = (text: string): string => {
    // Làm sạch và format response từ bot
    let formatted = text
        .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold markdown
        .replace(/\*(.*?)\*/g, '$1')     // Remove italic markdown
        .replace(/#{1,6}\s/g, '')        // Remove headers
        .replace(/🌱\s?SmartBot:\s?/gi, '') // Remove duplicate SmartBot prefix
        .trim();

    // Thêm emoji và format cho các phần khác nhau
    formatted = formatted
        .replace(/(\d+\.\s)/g, '\n$1')   // New line before numbered lists
        .replace(/(-\s)/g, '\n• ')       // Convert dashes to bullets
        .replace(/\n\n+/g, '\n\n')       // Remove extra line breaks
        .trim();

    return `🌱 ${formatted}`;
};

export default function ChatBox() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [pendingImage, setPendingImage] = useState<string | null>(null);
    const flatListRef = useRef<FlatList<Message>>(null);
    const inputRef = useRef<TextInput>(null);
    const { imageUri } = useLocalSearchParams();
    const router = useRouter();
    const fadeAnim = useRef(new Animated.Value(0)).current;
    
    // Request permissions on mount
    useEffect(() => {
        (async () => {
            const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
            const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            
            if (cameraStatus !== 'granted' || mediaStatus !== 'granted') {
                Alert.alert(
                    'Cần quyền truy cập',
                    'Ứng dụng cần quyền truy cập camera và thư viện để chụp/chọn ảnh cây trồng.',
                    [{ text: 'OK' }]
                );
            }
        })();
    }, []);

    // Initial welcome message
    useEffect(() => {
        if (messages.length === 0) {
            const welcomeMessage: Message = {
                id: 'welcome',
                text: '🌱 Chào mừng bạn đến với SmartGarden! Tôi là trợ lý AI của bạn. Hãy hỏi tôi về chăm sóc cây, phát hiện bệnh, hoặc gửi ảnh để tôi giúp bạn phân tích! 🌿',
                sender: 'bot',
                timestamp: Date.now(),
            };
            setMessages([welcomeMessage]);
        }
    }, []);

    // Handle new image from camera or gallery
    useEffect(() => {
        if (imageUri) {
            const uri = Array.isArray(imageUri) ? imageUri[0] : imageUri;
            if (uri !== pendingImage) {
                setPendingImage(uri);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        }
    }, [imageUri, fadeAnim]);

    const handleSend = async () => {
        if (!input.trim() && !pendingImage) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input || undefined,
            imageUri: pendingImage || undefined,
            sender: 'user',
            timestamp: Date.now(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        const tempImageUri = pendingImage;
        setPendingImage(null);
        setLoading(true);
        fadeAnim.setValue(0);

        try {
            const aiReply = await getAIResponse(input, tempImageUri || undefined);
            const formattedReply = formatBotResponse(aiReply);

            const botMessage: Message = {
                id: Date.now().toString() + 'bot',
                text: formattedReply,
                sender: 'bot',
                timestamp: Date.now(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
            const errorMessage: Message = {
                id: Date.now().toString() + 'error',
                text: '❌ Xin lỗi, tôi không thể kết nối được. Vui lòng thử lại sau. Trong lúc chờ đợi, bạn có thể hỏi tôi những câu hỏi cơ bản về chăm sóc cây trồng nhé!',
                sender: 'bot',
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 300);
        }
    };

    const openCamera = async () => {
        try {
            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                setPendingImage(result.assets[0].uri);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể mở camera. Vui lòng thử lại.');
        }
    };

    const openGallery = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 0.8,
            });

            if (!result.canceled && result.assets[0]) {
                setPendingImage(result.assets[0].uri);
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }).start();
            }
        } catch (error) {
            Alert.alert('Lỗi', 'Không thể mở thư viện ảnh. Vui lòng thử lại.');
        }
    };

    const openCameraOptions = () => {
        Alert.alert(
            '📸 Chụp ảnh cây trồng',
            'Chọn nguồn ảnh để tôi có thể giúp bạn phân tích cây trồng',
            [
                {
                    text: '📷 Chụp ảnh mới',
                    onPress: openCamera,
                },
                {
                    text: '🖼️ Chọn từ thư viện',
                    onPress: openGallery,
                },
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    const renderDay = ({ item, index }: { item: Message; index: number }) => {
        const currentDate = new Date(item.timestamp).toLocaleDateString('vi-VN');
        const prevDate = index > 0 
            ? new Date(messages[index - 1].timestamp).toLocaleDateString('vi-VN') 
            : null;
        
        if (index === 0 || currentDate !== prevDate) {
            return (
                <View style={styles.dayContainer}>
                    <Text style={styles.dayText}>{currentDate}</Text>
                </View>
            );
        }
        return null;
    };

    const renderBotText = (text: string) => {
        const parts = text.split('\n');
        return (
            <View>
                {parts.map((part, index) => {
                    if (part.trim() === '') return null;
                    
                    const isBullet = part.trim().startsWith('•');
                    const isNumbered = /^\d+\./.test(part.trim());
                    
                    return (
                        <Text 
                            key={index} 
                            style={[
                                styles.botText,
                                isBullet && { marginLeft: 8, marginVertical: 2 },
                                isNumbered && { marginVertical: 2, fontWeight: '500' }
                            ]}
                        >
                            {part.trim()}
                        </Text>
                    );
                })}
            </View>
        );
    };

    const renderItem = ({ item, index }: { item: Message; index: number }) => {
        const dayHeader = renderDay({ item, index });
        const isUser = item.sender === 'user';
        const bubbleStyle = isUser ? styles.userBubble : styles.botBubble;
        
        return (
            <>
                {dayHeader}
                <View style={[styles.messageContainer, isUser ? styles.userContainer : styles.botContainer]}>
                    {!isUser && (
                        <View style={styles.avatarContainer}>
                            <View style={styles.avatar}>
                                <Ionicons name="leaf" size={14} color="#fff" />
                            </View>
                        </View>
                    )}
                    
                    <View style={[styles.bubbleWrapper, isUser ? styles.userBubbleWrapper : styles.botBubbleWrapper]}>
                        <View style={bubbleStyle}>
                            {item.imageUri ? (
                                <View>
                                    <Image
                                        source={{ uri: item.imageUri }}
                                        style={styles.messageImage}
                                        resizeMode="cover"
                                    />
                                    {item.text ? (
                                        <View style={styles.imageCaption}>
                                            {isUser ? (
                                                <Text style={styles.userText}>{item.text}</Text>
                                            ) : (
                                                renderBotText(item.text)
                                            )}
                                        </View>
                                    ) : null}
                                </View>
                            ) : (
                                <>
                                    {isUser ? (
                                        <Text style={styles.userText}>{item.text}</Text>
                                    ) : (
                                        renderBotText(item.text || '')
                                    )}
                                </>
                            )}
                            <Text style={[styles.timestamp, isUser ? styles.userTimestamp : styles.botTimestamp]}>
                                {formatTime(item.timestamp)}
                            </Text>
                        </View>
                    </View>
                </View>
            </>
        );
    };

    const headerBackgroundColor = '#16a34a';

    return (
        <SafeAreaView style={[styles.container]}>
            <StatusBar 
                style="dark" 
                backgroundColor={headerBackgroundColor} 
                translucent={Platform.OS === 'android'} 
            />
            
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(Main)/MyPlants')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>SmartGarden AI</Text>
                    <Text style={styles.headerSubtitle}>🌱 Trợ lý thông minh cho cây trồng</Text>
                </View>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="menu" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                initialNumToRender={15}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                ListHeaderComponent={
                    <View style={styles.welcomeBanner}>
                        <Image 
                            source={require('@/assets/images/logo.png')} 
                            style={styles.welcomeImage}
                            defaultSource={require('@/assets/images/logo.png')}
                        />
                        <Text style={styles.welcomeText}>
                            🌿 SmartGarden
                        </Text>
                    </View>
                }
            />

            {loading && (
                <View style={styles.typingContainer}>
                    <View style={styles.typingAvatar}>
                        <Ionicons name="leaf" size={12} color="#fff" />
                    </View>
                    <View style={styles.typingBubble}>
                        <View style={styles.typingDots}>
                            <View style={[styles.typingDot, styles.typingDot1]} />
                            <View style={[styles.typingDot, styles.typingDot2]} />
                            <View style={[styles.typingDot, styles.typingDot3]} />
                        </View>
                    </View>
                </View>
            )}

            {pendingImage && (
                <Animated.View style={[styles.pendingImageContainer, { opacity: fadeAnim }]}>
                    <View style={styles.pendingImageWrapper}>
                        <Image
                            source={{ uri: pendingImage }}
                            style={styles.pendingImage}
                        />
                        <TouchableOpacity
                            style={styles.removeImageButton}
                            onPress={() => {
                                setPendingImage(null);
                                fadeAnim.setValue(0);
                            }}
                        >
                            <Ionicons name="close-circle" size={22} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={90}
            >
                <View style={styles.inputContainer}>
                    <TouchableOpacity style={styles.cameraButton} onPress={openCameraOptions}>
                        <Ionicons name="camera" size={24} color="#22c55e" />
                    </TouchableOpacity>
                    
                    <TextInput
                        ref={inputRef}
                        style={styles.textInput}
                        placeholder="Hỏi về cây trồng hoặc gửi ảnh để phân tích..."
                        value={input}
                        onChangeText={setInput}
                        multiline
                        maxLength={500}
                        placeholderTextColor="#6ee7b7"
                        onFocus={() => setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100)}
                    />
                    
                    <TouchableOpacity 
                        onPress={handleSend} 
                        style={[styles.sendButton, (!input.trim() && !pendingImage) ? styles.sendButtonDisabled : null]} 
                        disabled={loading || (!input.trim() && !pendingImage)}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#fff" />
                        ) : (
                            <Ionicons name="send" size={18} color="#fff" />
                        )}
                    </TouchableOpacity>
                </View>
                
                <View style={styles.inputFooter}>
                    <Text style={styles.poweredBy}>🤖 Powered by Gemini AI</Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}