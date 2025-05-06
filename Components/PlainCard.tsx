import React from 'react';
import { View, Text } from 'react-native';

const PlantCard = ({ name }: { name: string }) => {
    return (
        <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
            <Text className="text-xl font-semibold text-green-700">{name}</Text>
        </View>
    );
};

export default PlantCard;
