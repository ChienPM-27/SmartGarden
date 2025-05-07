import { MaterialIcons } from "@expo/vector-icons";
import { TextInput, View, Text, ImageBackground } from "react-native";
import { images } from '@/constants/images';

const PlantInfoCard = () => {
    return (
        <ImageBackground
            source={images.bg}
            className="flex-1 justify-center items-center"
            resizeMode="cover"
        >
            <View className="p-4 space-y-6 bg-white/80 rounded-2xl w-full max-w-full mx-2">
                {/* Khung tên cây */}
                <View className="rounded-2xl shadow-lg border border-gray-300 p-4 bg-white mb-4">
                    <Text className="text-3xl font-bold text-green-800 mb-1">Xà lách</Text>
                    <Text className="text-gray-500 italic text-lg">Lactuca sativa</Text>
                </View>

                {/* Khung lớn chứa thông tin cơ bản và điều kiện sinh trưởng */}
                <View className="rounded-2xl shadow-lg border border-gray-200 p-6 space-y-6 bg-white">
                    {/* Tiêu đề thông tin cơ bản */}
                    <Text className="text-2xl font-bold text-green-800 mb-4 text-left">Thông tin cơ bản</Text>
                    <View className="flex-row space-x-6">
                        {/* Khung nhỏ thứ nhất */}
                        <View className="flex-1 space-y-4 border border-gray-300 p-4 rounded-lg">
                            <Text className="pl-1 text-base flex-row items-center">
                                <MaterialIcons name="nature" size={20} color="#4CAF50" />
                                <Text className="ml-2">Loại cây: Rau ăn lá</Text>
                            </Text>
                            <Text className="pl-1 text-base flex-row items-center">
                                <MaterialIcons name="timer" size={20} color="#2196F3" />
                                <Text className="ml-2">Chu kỳ sinh trưởng: Ngắn hạn</Text>
                            </Text>
                            <Text className="pl-1 text-base flex-row items-center">
                                <MaterialIcons name="calendar-today" size={20} color="#FFC107" />
                                <Text className="ml-2">Mùa vụ phù hợp: Mùa đông</Text>
                            </Text>
                        </View>

                        {/* Khung nhỏ thứ hai */}
                        <View className="flex-1 space-y-4 border border-gray-300 p-4 rounded-lg">
                            <Text className="text-lg font-semibold text-green-800 mb-3">Điều kiện sinh trưởng</Text>
                            <Text className="pl-1 text-base flex-row items-center">
                                <MaterialIcons name="thermostat" size={20} color="#F44336" />
                                <Text className="ml-2">Nhiệt độ lý tưởng</Text>
                            </Text>
                            <Text className="pl-1 text-base flex-row items-center">
                                <MaterialIcons name="water-drop" size={20} color="#2196F3" />
                                <Text className="ml-2">Độ ẩm thích hợp</Text>
                            </Text>
                            <Text className="pl-1 text-base flex-row items-center">
                                <MaterialIcons name="wb-sunny" size={20} color="#FFC107" />
                                <Text className="ml-2">Ánh sáng cần thiết</Text>
                            </Text>
                            <Text className="pl-1 text-base flex-row items-center">
                                <MaterialIcons name="terrain" size={20} color="#4CAF50" />
                                <Text className="ml-2">Loại đất phù hợp</Text>
                            </Text>
                        </View>
                    </View>

                    {/* Khung cuối cùng nằm dưới hai khung nhỏ */}
                    <View className="space-y-4 border border-gray-300 p-4 rounded-lg">
                        <Text className="text-2xl font-bold text-green-800 mb-3 text-left">Năng suất & thu hoạch</Text>
                        <Text className="pl-1 text-base flex-row items-center">
                            <MaterialIcons name="hourglass-bottom" size={20} color="#2196F3" />
                            <Text className="ml-2">Thời gian thu hoạch</Text>
                        </Text>
                        <Text className="pl-1 text-base flex-row items-center">
                            <MaterialIcons name="analytics" size={20} color="#4CAF50" />
                            <Text className="ml-2">Năng suất trung bình</Text>
                        </Text>
                        <Text className="pl-1 text-base flex-row items-center">
                            <MaterialIcons name="spa" size={20} color="#9C27B0" />
                            <Text className="ml-2">Dấu hiệu thu hoạch: Lá ngoài lớn</Text>
                        </Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};

export default PlantInfoCard;
