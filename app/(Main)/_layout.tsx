import { Stack, Tabs } from "expo-router";

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { display: "none" }, // Ẩn hoàn toàn thanh tab
            }}
        >
            <Tabs.Screen
                name="chat-box"
                options={{
                    title: 'chat-box',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tabs.Screen
                name="Home/HomeScreen"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tabs.Screen
                name="my-plants"
                options={{
                    title: 'my-plants',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tabs.Screen
                name="community/index"
                options={{
                    title: 'community',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'profile',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
        </Tabs>
    );
};

export default _Layout;
