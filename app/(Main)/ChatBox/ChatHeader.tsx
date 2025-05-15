import React from 'react';
import { View, Text } from 'react-native';

const ChatHeader: React.FC = () => {
    return (
        <View className="bg-green-700 py-4 items-center shadow-md">
            <Text className="text-white text-xl font-bold">SmartGarden</Text>
        </View>
    );
};

export default ChatHeader;
