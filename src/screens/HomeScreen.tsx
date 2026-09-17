import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import type { RootStackParamList } from '../types/navigation';
import { ScreenContainer } from '../components/ScreenContainer';
import { PartyButton } from '../components/PartyButton';
import { useGameSession } from '../context/GameSessionContext';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export function HomeScreen({ navigation }: Props) {
  const { resetScore } = useGameSession();

  // Being back at Home always means a fresh session, whether on first
  // launch or after a previous game ended.
  useFocusEffect(
    React.useCallback(() => {
      resetScore();
    }, [resetScore]),
  );

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.emoji}>🎭🕵️‍♀️</Text>
        <Text style={styles.title}>ALIBI</Text>
        <Text style={styles.subtitle}>
          Zwei Verdächtige. Ein Vorfall. Wer ist sus? 👀
        </Text>
      </View>

      <View style={styles.footer}>
        <PartyButton
          label="Spiel starten"
          onPress={() => navigation.navigate('PlayerSetup')}
        />
        <Text style={styles.hint}>Ab 3 Spieler*innen · kein Internet nötig</Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: spacing.xxl,
  },
  hero: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 56,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: 56,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 6,
  },
  subtitle: {
    marginTop: spacing.md,
    fontSize: 16,
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },
  footer: {
    alignItems: 'center',
    gap: spacing.md,
  },
  hint: {
    color: colors.textFaint,
    fontSize: 13,
  },
});
