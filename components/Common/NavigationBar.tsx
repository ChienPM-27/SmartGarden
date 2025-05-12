import React, { useState, useEffect } from 'react';
import {
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter, usePathname } from 'expo-router';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { height: screenHeight } = Dimensions.get('window');

const NavigationBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('home');
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);

    useEffect(() => {
        // Cập nhật activeTab dựa trên pathname hiện tại
        if (pathname.includes('Home')) {
            setActiveTab('home');
        } else if (pathname.includes('my-plants')) {
            setActiveTab('my-plants');
        } else if (pathname.includes('chat-box')) {
            setActiveTab('chat-box');
        } else if (pathname.includes('community')) {
            setActiveTab('setting');
        }
    }, [pathname]);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const handleCameraAccess = async () => {
        if (!hasCameraPermission) {
            Alert.alert('Permission needed', 'Camera permission is required to use this feature');
            return;
        }

        try {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                // Chuyển hướng đến chat-box với ảnh
                setActiveTab('chat-box');
                router.push({
                    pathname: '/(Main)/chat-box',
                    params: { imageUri: result.assets[0].uri }
                });
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to take photo');
        }
    };

    const _renderIcon = (routeName: string) => {
        let icon: 'home' | 'list' | 'chat' | 'person' = 'home';
        
        switch (routeName) {
            case 'home':
                icon = 'home';
                break;
            case 'my-plants':
                icon = 'list';
                break;
            case 'chat-box':
                icon = 'chat';
                break;
            case 'setting':
                icon = 'person';
                break;
        }

        const isActive = routeName === activeTab;
        
        return (
            <View style={styles.iconContainer}>
                <MaterialIcons
                    name={icon}
                    size={25}
                    color={isActive ? '#10B981' : '#808080'}
                />
                {isActive && <View style={styles.activeIndicator} />}
            </View>
        );
    };

    const renderTabBar = ({ routeName, navigate }: any) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    setActiveTab(routeName);
                    switch (routeName) {
                        case 'home':
                            router.push('/(Main)/Home');
                            break;
                        case 'my-plants':
                            router.push('/(Main)/my-plants');
                            break;
                        case 'chat-box':
                            router.push('/(Main)/chat-box');
                            break;
                        case 'setting':
                            router.push('/(Main)/community');
                            break;
                    }
                }}
                style={styles.tabbarItem}
            >
                {_renderIcon(routeName)}
            </TouchableOpacity>
        );
    };

    return (
        <>
            <CurvedBottomBarExpo.Navigator
                type="DOWN"
                style={styles.bottomBar}
                shadowStyle={styles.shadow}
                height={55}
                circleWidth={50}
                bgColor="white"
                initialRouteName="home"
                borderTopLeftRight
                renderCircle={({ selectedTab, navigate }) => (
                    <Animated.View style={styles.btnCircleUp}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleCameraAccess}
                        >
                            <MaterialIcons name="camera-alt" color="gray" size={30} />
                        </TouchableOpacity>
                    </Animated.View>
                )}
                tabBar={renderTabBar}
            >
                <CurvedBottomBarExpo.Screen
                    name="home"
                    position="LEFT"
                    component={() => <View style={styles.screen1} />}
                />
                <CurvedBottomBarExpo.Screen
                    name="my-plants"
                    position="LEFT"
                    component={() => <View style={styles.screen2} />}
                />
                <CurvedBottomBarExpo.Screen
                    name="chat-box"
                    position="RIGHT"
                    component={() => <View style={styles.screen1} />}
                />
                <CurvedBottomBarExpo.Screen
                    name="setting"
                    position="RIGHT"
                    component={() => <View style={styles.screen2} />}
                />
            </CurvedBottomBarExpo.Navigator>
            <View style={styles.bottomSpacer} />
        </>
    );
};

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#DDDDDD',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 5,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
    },
    bottomBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        borderTopWidth: 0,
    },
    btnCircleUp: {
        width: 67,
        height: 67,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#E8E8E8',
        bottom: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
    },
    tabbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    screen1: {
        flex: 1,
        backgroundColor: '#BFEFFF',
    },
    screen2: {
        flex: 1,
        backgroundColor: '#FFEBCD',
    },
    bottomSpacer: {
        height: 15,
        backgroundColor: 'white',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    activeIndicator: {
        position: 'absolute',
        bottom: -5,
        width: 4,
        height: 4,
        borderRadius: 2,
        backgroundColor: '#10B981',
    }
});

export default NavigationBar;
