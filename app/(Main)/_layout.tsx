import { Stack, Tabs } from "expo-router";

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { display: "none" }, // Ẩn hoàn toàn thanh tab
            }}
        >
            <Tabs.Screen
                name="ChatBox/index"
                options={{
                    title: 'ChatBox',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tabs.Screen
                name="Home/index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tabs.Screen
                name="MyPlants/index"
                options={{
                    title: 'MyPlants',
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
                name="News/index"
                options={{
                    title: 'News',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
        </Tabs>
    );
};

export default _Layout;
