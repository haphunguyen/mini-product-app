import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import CartHeader from '@/components/product/CartHeader';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { TabBarHeight } from '@/constants/TabBar';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function TabLayout() {
  const tintColor = useThemeColor('tint')
  const backgroundColor = useThemeColor('background')
  const textColor = useThemeColor('text')

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: tintColor,
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
            backgroundColor: backgroundColor,
            borderBottomWidth: 1,
          },
          headerTintColor: textColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign:'center',
          headerRight: () => (<CartHeader />),
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="storefront" color={color} />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          headerShown: true,
          headerStyle: {
            backgroundColor: backgroundColor,
            borderBottomWidth: 1,
          },
          headerTintColor: textColor,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign:'center',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cart" color={color} />,
        }}
      />
    </Tabs>
  );
}
