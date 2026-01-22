import { Stack } from 'expo-router'

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/welcome" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding/setup" options={{ title: 'Setup' }} />
      <Stack.Screen name="(main)/home" options={{ headerShown: false }} />
      <Stack.Screen name="(main)/settings" options={{ title: 'Settings' }} />
    </Stack>
  )
}
