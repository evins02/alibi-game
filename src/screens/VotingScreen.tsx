import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import type { SuspectKey } from '../types/game';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Voting'>;

export function VotingScreen({ navigation, route }: Props) {
  const { players, modeId, suspects, scenario, guilty, accomplices } = route.params;
  const investigatorCount = players.length - 2;

  function handleAccuse(accused: SuspectKey) {
    navigation.navigate('Result', {
      players,
      modeId,
      suspects,
      scenario,
      guilty,
      accomplices,
      accused,
    });
  }

  return (
    <ScreenContainer style={styles.container}>
      <View>
        <Text style={styles.title}>Wer ist schuldig?</Text>
        <Text style={styles.subtitle}>
          Alle {investigatorCount} Ermittler einigen sich jetzt gemeinsam (z.
          B. per Handzeichen oder Diskussion) auf eine Anschuldigung.
        </Text>
      </View>

      <View style={styles.optionsBlock}>
        <AccuseOption name={suspects.first} onPress={() => handleAccuse('first')} />
        <AccuseOption name={suspects.second} onPress={() => handleAccuse('second')} />
      </View>
    </ScreenContainer>
  );
}

function AccuseOption({ name, onPress }: { name: string; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
    >
      <Text style={styles.optionEmoji}>👉</Text>
      <Text style={styles.optionTitle}>{name}</Text>
      <Text style={styles.optionDescription}>ist schuldig</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 20,
  },
  optionsBlock: {
    gap: spacing.md,
  },
  option: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  optionPressed: {
    opacity: 0.85,
    borderColor: colors.primary,
  },
  optionEmoji: {
    fontSize: 32,
    marginBottom: spacing.sm,
  },
  optionTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '800',
    textAlign: 'center',
  },
  optionDescription: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
});
