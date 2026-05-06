import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import type { RootStackParamList, TabParamList } from './types';
import { FeedScreen } from '../screens/FeedScreen';
import { SavedTabScreen } from '../screens/SavedTabScreen';
import { ArticleWebViewScreen } from '../screens/ArticleWebViewScreen';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<TabParamList>();

interface TabIconProps {
  color: string;
  size: number;
}

const FeedTabIcon = ({ color, size }: TabIconProps) => (
  <Text style={{ color, fontSize: size }}>📰</Text>
);
const SavedTabIcon = ({ color, size }: TabIconProps) => (
  <Text style={{ color, fontSize: size }}>🔒</Text>
);

function TabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#0369A1',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tabs.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          title: 'GeeksForGeeks',
          tabBarLabel: 'Feed',
          tabBarIcon: FeedTabIcon,
        }}
      />
      <Tabs.Screen
        name="Saved"
        component={SavedTabScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Saved',
          tabBarIcon: SavedTabIcon,
        }}
      />
    </Tabs.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name="Tabs"
          component={TabsNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="ArticleWebView"
          component={ArticleWebViewScreen}
          options={{
            headerShown: false,
            presentation: 'card',
          }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
