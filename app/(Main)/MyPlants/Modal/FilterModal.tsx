import React, { useState } from 'react';
import {
    Modal,
    View,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    Animated,
    Keyboard,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface FilterModalProps {
    filterVisible: boolean;
    setFilterVisible: (visible: boolean) => void;
    filterCriteria: string;
    setFilterCriteria: (criteria: string) => void;
    handleFilter: () => void;
}

const FilterModal: React.FC<FilterModalProps> = ({
    filterVisible,
    setFilterVisible,
    filterCriteria,
    setFilterCriteria,
    handleFilter,
}) => {
    const [animation] = useState(new Animated.Value(0));

    React.useEffect(() => {
        if (filterVisible) {
            Animated.spring(animation, {
                toValue: 1,
                tension: 30,
                friction: 7,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(animation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }).start();
        }
    }, [filterVisible]);

    const slideUp = {
        transform: [
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [600, 0],
                }),
            },
        ],
    };

    const backdropOpacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
    });

    const handleClose = () => {
        setFilterVisible(false);
    };

    const handleSubmit = () => {
        handleFilter();
        setFilterVisible(false);
    };

    const handleClearFilter = () => {
        setFilterCriteria('');
    };

    return (
        <Modal
            visible={filterVisible}
            transparent
            animationType="none"
            onRequestClose={handleClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1 justify-end"
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View className="flex-1 justify-end">
                        <Animated.View
                            className="absolute inset-0 bg-black"
                            style={{ opacity: backdropOpacity }}
                            onTouchEnd={handleClose}
                        />
                        <Animated.View style={slideUp} className="bg-white rounded-t-3xl">
                            <View className="px-6 pt-4 pb-2 border-b border-gray-100 flex-row justify-between items-center">
                                <View className="flex-row items-center">
                                    <MaterialIcons name="filter-list" size={20} color="#047857" />
                                    <Text className="text-xl font-bold text-green-900 ml-2">Lọc cây trồng</Text>
                                </View>
                                <TouchableOpacity
                                    onPress={handleClose}
                                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                                    accessibilityLabel="Đóng cửa sổ lọc"
                                >
                                    <MaterialIcons name="close" size={24} color="#374151" />
                                </TouchableOpacity>
                            </View>

                            <ScrollView className="p-6 max-h-96">
                                <View className="relative mb-6">
                                    <View className="absolute left-3 top-3 z-10">
                                        <MaterialIcons name="search" size={20} color="#6B7280" />
                                    </View>
                                    <TextInput
                                        placeholder="Tìm kiếm theo mô tả..."
                                        value={filterCriteria}
                                        onChangeText={setFilterCriteria}
                                        className="bg-gray-50 border border-gray-200 rounded-xl p-3 pl-10 text-gray-700"
                                        accessibilityLabel="Nhập tiêu chí lọc"
                                    />
                                    {filterCriteria.length > 0 && (
                                        <TouchableOpacity
                                            className="absolute right-3 top-3 z-10"
                                            onPress={handleClearFilter}
                                            accessibilityLabel="Xóa nội dung tìm kiếm"
                                        >
                                            <MaterialIcons name="close" size={16} color="#6B7280" />
                                        </TouchableOpacity>
                                    )}
                                </View>

                                {/* Đây là nơi bạn có thể thêm các bộ lọc khác nếu cần */}
                            </ScrollView>

                            <View className="p-6 border-t border-gray-100">
                                <View className="flex-row justify-between space-x-3">
                                    <TouchableOpacity
                                        className="bg-gray-100 py-4 rounded-xl flex-1"
                                        onPress={handleClose}
                                        accessibilityLabel="Hủy lọc"
                                    >
                                        <Text className="text-center text-gray-700 font-semibold">Hủy</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        className="bg-green-600 py-4 rounded-xl flex-1"
                                        onPress={handleSubmit}
                                        accessibilityLabel="Áp dụng bộ lọc"
                                    >
                                        <Text className="text-center text-white font-semibold">Áp dụng</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Animated.View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default FilterModal;
