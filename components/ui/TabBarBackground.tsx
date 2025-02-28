// This is a shim for web and Android where the tab bar is generally opaque.
import { BlurView } from 'expo-blur';
import { Platform, View } from 'react-native';

export default function TabBarBackground() {
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        tint="light"
        intensity={15}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }}
      />
    );
  }

  // Fallback for Android
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(5px)',
      }}
    />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
