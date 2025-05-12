import { Tabs } from 'expo-router';
import { View } from 'react-native';

const _Layout = () => {
  return (
    <View className="flex-1">
      <Tabs
        screenOptions={{
          tabBarStyle: { display: 'none' },
        }}
      >
        <Tabs.Screen
          name="chat-box"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="Home"
          options={{
            title: 'Home',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="community/index"
          options={{
            title: 'Community',
            headerShown: false,
          }}
        />
        <Tabs.Screen
          name="my-plants"
          options={{
            title: 'My Plants',
            headerShown: false,
          }}
        />
      </Tabs>
    </View>
  );
};

export default _Layout;
