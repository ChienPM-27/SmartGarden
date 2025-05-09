import { Tabs } from "expo-router";

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
                    title: 'Home',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tabs.Screen
                name="Home"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tabs.Screen
                name = "setting"
                options={{
                    title: 'Setting',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tabs.Screen
                name="my-plants"
                options={{
                    title: 'My Plants',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />

        </Tabs>
    );
};

export default _Layout;
