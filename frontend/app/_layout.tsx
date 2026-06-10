/** Root layout — dark RPG theme for all screens. */
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#0f1117' },
          headerTintColor: '#f0f4ff',
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: '#0f1117' },
        }}
      />
    </>
  );
}
