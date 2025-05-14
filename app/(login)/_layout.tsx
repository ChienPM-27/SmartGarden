import { Tabs } from "expo-router";

const _Layout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: { display: "none" }, // Ẩn hoàn toàn thanh tab
            }}
        >
            <Tabs.Screen
                name="login"
                options={{
                    title: 'Home',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tabs.Screen
                name="create-account"
                options={{
                    title: 'Create account',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
            <Tabs.Screen
                name="forgot-password"
                options={{
                    title: 'Forgot password',
                    headerShown: false,
                    tabBarButton: () => null,
                }}
            />
        </Tabs>
    );
};

export default _Layout;
