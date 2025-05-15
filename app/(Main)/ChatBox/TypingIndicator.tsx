import React from 'react';
import { View, Text } from 'react-native';

const TypingIndicator: React.FC = () => {
    return (
        <View className="self-start mb-2 px-4 py-2 bg-gray-200 rounded-2xl">
            <Text className="text-gray-500 italic">Typing...</Text>
        </View>
    );
};

export default TypingIndicator;
