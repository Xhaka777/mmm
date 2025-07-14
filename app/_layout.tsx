import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { CartProvider } from '@/contexts/CartContext';
import { CountryProvider } from '@/contexts/CountryContext';

export default function RootLayout() {
  useFrameworkReady();

  return (
    <CountryProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </CartProvider>
    </CountryProvider>
  );
}