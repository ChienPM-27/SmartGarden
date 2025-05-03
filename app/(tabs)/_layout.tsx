import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import {Tabs} from "expo-router";
import {images} from "@/constants/images";
import {icons} from "@/constants/icons";

const TabIcon = ({focused, icon, title }: any) => {
    if(focused) {
        return (
            <ImageBackground
                source={images.highlight}
                className="flex flex-row w-full flex-1 min-w-[112px] min-h-16 mt-4 justify-center items-center rounded-full overflow-hidden"
            >
                <Image source = {icon} tintColor ="#0e403c" className="size-5" />
                <Text className="text-main text-base font-semibold ml-2">{title}</Text>
            </ImageBackground>
        )
    }

    return (
        <View className="size-full justify-center items-center mt-4 rounded-full">
            <Image source={icon} tintColor ="#bef6e2" className="size-5" />

        </View>
    )
}

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarItemStyle: {
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabBarStyle: {
                    backgroundColor: '#081815',
                    borderRadius: 50,
                    marginHorizontal: 20,
                    marginBottom: 36,
                    height: 53,
                    position: 'absolute',
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: '#081815',
                }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabIcon
                                focused={focused}
                                icon={icons.home}
                                title="Home"
                            />
                        </>
                    )
                }}
            />
            <Tabs.Screen
            name="search"
            options={{
                title: 'Search',
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <>
                        <TabIcon
                            focused={focused}
                            icon={icons.search}
                            title="Search"
                        />
                    </>
                )
            }}/>
            <Tabs.Screen
                name="chatbox"
                options={{
                    title: 'Chatbox',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabIcon
                                focused={focused}
                                icon={icons.save}
                                title="Chatbox"
                            />
                        </>
                    )
                }}/>
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    headerShown: false,
                    tabBarIcon: ({ focused }) => (
                        <>
                            <TabIcon
                                focused={focused}
                                icon={icons.person}
                                title="Profile"
                            />
                        </>
                    )
                }}/>

        </Tabs>
    );
};

export default _Layout;
