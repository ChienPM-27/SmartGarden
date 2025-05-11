    import React, { useState } from 'react';
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
    import { useRouter } from 'expo-router';

    const { height: screenHeight } = Dimensions.get('window');

    const NavigationBar = () => {
        const router = useRouter();
        const [selectedTab, setSelectedTab] = useState('home');

        const _renderIcon = (routeName: string, selectedTab: string) => {
            let icon = '';
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
            return (
                <MaterialIcons
                    name={icon}
                    size={25}
                    color={routeName === selectedTab ? '#10B981' : '#808080'}
                />
            );
        };

        const renderTabBar = ({ routeName, selectedTab, navigate }: any) => {
            return (
                <TouchableOpacity
                    onPress={() => {
                        setSelectedTab(routeName);
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
                    {_renderIcon(routeName, selectedTab)}
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
                                onPress={() => Alert.alert('Action Button Clicked!')}
                            >
                                <MaterialIcons name="qr-code-scanner" color="gray" size={30} />
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
    });

    export default NavigationBar;
