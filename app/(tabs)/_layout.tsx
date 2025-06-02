import { Tabs } from 'expo-router';
import React, { useMemo } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { TabBarHeight } from '@/constants/TabBar';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = useMemo(() => Colors[colorScheme ?? 'light'], [colorScheme])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            height: TabBarHeight,
          },
          android: {
            height: TabBarHeight,
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Products',
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
            borderBottomWidth: 1,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="storefront" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.background,
            borderBottomWidth: 1,
          },
          headerTintColor: colors.text,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cart" color={color} />,
        }}
      />
    </Tabs>
  );
}
