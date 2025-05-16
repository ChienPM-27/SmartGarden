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
    Alert,
    Animated,
    Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getAIResponse } from '@/components/services/geminiService';
import styles from './chatbox.styles';

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
    const screenWidth = Dimensions.get('window').width;
    
    // Initial welcome message
    useEffect(() => {
        if (messages.length === 0) {
            const welcomeMessage: Message = {
                id: 'welcome',
                text: 'Chào mừng bạn đến với SmartGarden! Tôi có thể giúp gì cho bạn về cây trồng?',
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
                // Animate the image appearance
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
        fadeAnim.setValue(0); // Reset fade animation

        try {
            const aiReply = await getAIResponse(input, tempImageUri || undefined);

            const botMessage: Message = {
                id: Date.now().toString() + 'bot',
                text: aiReply,
                sender: 'bot',
                timestamp: Date.now(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Lỗi khi gửi tin nhắn:', error);
            Alert.alert(
                'Lỗi',
                'Không thể kết nối với SmartBot. Vui lòng kiểm tra kết nối Internet và thử lại.'
            );
        } finally {
            setLoading(false);
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 300);
        }
    };

    const renderDay = ({ item, index }: { item: Message; index: number }) => {
        const currentDate = new Date(item.timestamp).toLocaleDateString();
        const prevDate = index > 0 
            ? new Date(messages[index - 1].timestamp).toLocaleDateString() 
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

    const renderItem = ({ item, index }: { item: Message; index: number }) => {
        const dayHeader = renderDay({ item, index });
        
        const isUser = item.sender === 'user';
        const bubbleStyle = isUser ? styles.userBubble : styles.botBubble;
        const textStyle = isUser ? styles.userText : styles.botText;
        
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
                                        <Text style={[textStyle, styles.imageCaption]}>{item.text}</Text>
                                    ) : null}
                                </View>
                            ) : (
                                <Text style={textStyle}>{item.text}</Text>
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

    const openCameraOptions = () => {
        Alert.alert(
            'Chụp ảnh cây trồng',
            'Chọn nguồn ảnh',
            [
                {
                    text: 'Máy ảnh',
                    onPress: () => router.push('./CameraScreen'),
                },
                {
                    text: 'Thư viện',
                    onPress: () => router.push('./GalleryScreen'),
                },
                {
                    text: 'Huỷ',
                    style: 'cancel',
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Chat Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.push('/(Main)/Home')} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <View style={styles.headerContent}>
                    <Text style={styles.headerTitle}>SmartGarden</Text>
                    <Text style={styles.headerSubtitle}>Trợ lý thông minh</Text>
                </View>
                <TouchableOpacity style={styles.menuButton}>
                    <Ionicons name="menu" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Chat List */}
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
                        <Text style={styles.welcomeText}>Chào mừng đến với SmartGarden!</Text>
                    </View>
                }
            />

            {/* Typing Indicator */}
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

            {/* Pending Image Preview */}
            {pendingImage && (
                <Animated.View style={[styles.pendingImageContainer, { opacity: fadeAnim }]}>
                    <View style={styles.pendingImageWrapper}>
                        <Image
                            source={{ uri: pendingImage }}
                            style={styles.pendingImage}
                        />
                        <TouchableOpacity
                            style={styles.removeImageButton}
                            onPress={() => setPendingImage(null)}
                        >
                            <Ionicons name="close-circle" size={22} color="#ef4444" />
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            )}

            {/* Input Area */}
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
                        placeholder="Hỏi về cây trồng của bạn..."
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
                    <Text style={styles.poweredBy}>Powered by Gemini AI</Text>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

