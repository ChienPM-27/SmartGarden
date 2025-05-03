import { Tabs } from "expo-router";

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { display: "none" }, // Ẩn hoàn toàn thanh tab
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
        </Tabs>
    );
};

export default _Layout;
