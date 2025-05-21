import React, { useState, useEffect, useRef } from 'react';
import {
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Easing,
} from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const { height: screenHeight } = Dimensions.get('window');

const NavigationBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('home');
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    
    // Animation values for each tab
    const homeAnimation = useRef(new Animated.Value(activeTab === 'home' ? 1 : 0)).current;
    const myPlantsAnimation = useRef(new Animated.Value(activeTab === 'my-plants' ? 1 : 0)).current;
    const chatBoxAnimation = useRef(new Animated.Value(activeTab === 'chat-box' ? 1 : 0)).current;
    const settingAnimation = useRef(new Animated.Value(activeTab === 'setting' ? 1 : 0)).current;
    
    // Animation value for the camera button
    const cameraButtonAnimation = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (pathname.includes('/Home')) {
            setActiveTab('home');
        } else if (pathname.includes('/MyPlants')) {
            setActiveTab('my-plants');
        } else if (pathname.includes('/ChatBox')) {
            setActiveTab('chat-box');
        } else if (pathname.includes('/community')) {
            setActiveTab('setting');
        }
    }, [pathname]);

    useEffect(() => {
        // Animate the active tab
        Animated.parallel([
            Animated.timing(homeAnimation, {
                toValue: activeTab === 'home' ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
            Animated.timing(myPlantsAnimation, {
                toValue: activeTab === 'my-plants' ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
            Animated.timing(chatBoxAnimation, {
                toValue: activeTab === 'chat-box' ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
            Animated.timing(settingAnimation, {
                toValue: activeTab === 'setting' ? 1 : 0,
                duration: 300,
                useNativeDriver: true,
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
        ]).start();
    }, [activeTab]);

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasCameraPermission(status === 'granted');
        })();
    }, []);

    const animateCameraButton = () => {
        Animated.sequence([
            Animated.timing(cameraButtonAnimation, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
            Animated.timing(cameraButtonAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
                easing: Easing.bezier(0.2, 0.8, 0.2, 1),
            }),
        ]).start();
    };

    const handleCameraAccess = async () => {
        animateCameraButton();
        
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
                setActiveTab('chat-box');
                router.push({
                    pathname: '/(Main)/ChatBox',
                    params: { imageUri: result.assets[0].uri }
                });
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to take photo');
        }
    };

    const getAnimationForTab = (tabName: string) => {
        switch (tabName) {
            case 'home':
                return homeAnimation;
            case 'my-plants':
                return myPlantsAnimation;
            case 'chat-box':
                return chatBoxAnimation;
            case 'setting':
                return settingAnimation;
            default:
                return homeAnimation;
        }
    };

    const _renderIcon = (routeName: string) => {
        let icon = 'home';
        let IconComponent: any = MaterialIcons;

        switch (routeName) {
            case 'home':
                icon = 'home';
                IconComponent = MaterialIcons;
                break;
            case 'my-plants':
                icon = 'leaf'; 
                IconComponent = Entypo;
                break;
            case 'chat-box':
                icon = 'robot-excited-outline';
                IconComponent = MaterialCommunityIcons;
                break;
            case 'setting':
                icon = 'users';
                IconComponent = Feather;
                break;
        }

        const isActive = routeName === activeTab;
        const iconSize = (IconComponent === Feather || IconComponent === Entypo) ? 22 : 25;
        const animation = getAnimationForTab(routeName);

        // Animation styles
        const iconScale = animation.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.2],
        });

        const iconColor = animation.interpolate({
            inputRange: [0, 1],
            outputRange: ['#808080', '#10B981'],
        });

        return (
            <View style={styles.iconContainer}>
                <Animated.View style={{ 
                    transform: [{ scale: iconScale }],
                }}>
                    <IconComponent
                        name={icon}
                        size={iconSize}
                        color={isActive ? '#10B981' : '#808080'}
                    />
                </Animated.View>
                {isActive && (
                    <Animated.View 
                        style={[
                            styles.activeIndicator,
                            {
                                opacity: animation,
                                transform: [
                                    { scaleX: animation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0, 1],
                                    })},
                                ],
                            },
                        ]} 
                    />
                )}
            </View>
        );
    };

    const renderTabBar = ({ routeName, navigate }: { routeName: string; navigate: (name: string) => void }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    if (routeName !== activeTab) {
                        setActiveTab(routeName);
                        switch (routeName) {
                            case 'home':
                                router.push('/(Main)/Home');
                                break;
                            case 'my-plants':
                                router.push('/(Main)/MyPlants');
                                break;
                            case 'chat-box':
                                router.push('/(Main)/ChatBox');
                                break;
                            case 'setting':
                                router.push('/(Main)/community');
                                break;
                        }
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
                height={58}
                circleWidth={58}
                bgColor="white"
                initialRouteName="home"
                borderTopLeftRight
                renderCircle={({ selectedTab, navigate }: { selectedTab: string; navigate: (name: string) => void }) => (
                    <Animated.View 
                        style={[
                            styles.btnCircleUp,
                            {
                                transform: [{ scale: cameraButtonAnimation }]
                            }
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handleCameraAccess}
                            activeOpacity={0.8}
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

export default NavigationBar;

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#3EB489',
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
        alignItems: 'center',
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