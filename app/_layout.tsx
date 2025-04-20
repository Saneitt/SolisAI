import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { theme } from '../src/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { SplashScreen, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../src/contexts/AuthContext';
import { ActivityIndicator, View } from 'react-native';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function AppLayout() {
  const { session, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!session) {
        router.replace('/Login');
      } else {
        router.replace('/');
      }
    }
  }, [session, loading]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <Stack screenOptions={{ headerShown: false }} />;
} 

export default function Layout() {
  return <AuthProvider><PaperProvider theme={theme}><GestureHandlerRootView style={{ flex: 1 }}><AppLayout /></GestureHandlerRootView></PaperProvider></AuthProvider>;
}