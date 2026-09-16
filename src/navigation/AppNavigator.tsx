import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { HomeScreen } from '../screens/HomeScreen';
import { PlayerSetupScreen } from '../screens/PlayerSetupScreen';
import { ModeSelectScreen } from '../screens/ModeSelectScreen';
import { RevealScreen } from '../screens/RevealScreen';
import { VotingScreen } from '../screens/VotingScreen';
import { ResultScreen } from '../screens/ResultScreen';
import { colors } from '../theme/colors';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.text,
    border: colors.border,
    primary: colors.primary,
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PlayerSetup"
          component={PlayerSetupScreen}
          options={{ title: 'Spieler' }}
        />
        <Stack.Screen
          name="ModeSelect"
          component={ModeSelectScreen}
          options={{ title: 'Spielmodus' }}
        />
        <Stack.Screen
          name="Reveal"
          component={RevealScreen}
          options={{ title: 'Verdächtige', headerBackVisible: false }}
        />
        <Stack.Screen
          name="Voting"
          component={VotingScreen}
          options={{ title: 'Abstimmung', headerBackVisible: false }}
        />
        <Stack.Screen
          name="Result"
          component={ResultScreen}
          options={{ title: 'Ergebnis', headerBackVisible: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
