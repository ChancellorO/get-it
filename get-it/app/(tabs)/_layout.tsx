import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import { FontAwesome, Ionicons } from '@expo/vector-icons';  

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();


  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Ionicons name="home" size={28} color={color} />,  // ✅ Use Ionicons
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <Ionicons name="search" size={28} color={color} />,  // ✅ Use Ionicons
        }}
      />
      <Tabs.Screen
        name="reels"
        options={{
          title: 'Reels',
          tabBarIcon: ({ color }) => <FontAwesome name="film" size={28} color={color} />,  // ✅ Use FontAwesome
        }}
      />
      <Tabs.Screen
        name="discussion"
        options={{
          title: 'Discussion',
          tabBarIcon: ({ color }) => <Ionicons name="chatbubble" size={28} color={color} />,  // ✅ Use Ionicons
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />,  // ✅ Use Ionicons
        }}
      />
    </Tabs>
  );
}
