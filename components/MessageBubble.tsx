import React from 'react';
import { Text, View } from 'react-native';

type MessageBubbleProps = {
    text: string;
    isUser: boolean;
};

const MessageBubble: React.FC<MessageBubbleProps> = ({ text, isUser }) => {
    const bgColor = isUser ? 'bg-green-600' : 'bg-gray-200';
    const textColor = isUser ? 'text-white' : 'text-gray-900';
    const align = isUser ? 'self-end' : 'self-start';

    return (
        <View className={`max-w-[90%] ${align} mb-2 px-4 py-3 rounded-2xl ${bgColor} ${textColor} shadow`}>
            <Text className="text-base">{text}</Text>
        </View>
    );
};

export default MessageBubble;
