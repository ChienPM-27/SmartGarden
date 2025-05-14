import { Stack } from "expo-router";
import './globals.css';
import { Audio } from 'expo-av';
import React from 'react';

export default function RootLayout() {
  React.useEffect(() => {
    let sound: Audio.Sound;

    const playBackgroundMusic = async () => {
      try {
        sound = new Audio.Sound();
        await sound.loadAsync(require('@/assets/sound/videoplayback.m4a'));
        await sound.setIsLoopingAsync(true);
        await sound.setVolumeAsync(0.3); // Set volume to 30%
        await sound.playAsync();
      } catch (error) {
        console.error('Error playing sound:', error);
      }
    };

    playBackgroundMusic();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return (
    <Stack>
      <Stack.Screen name="(login)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(Main)" options={{ headerShown: false }} />
    </Stack>
  );
}
