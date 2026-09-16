import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import type { Verdict } from '../types/game';
import { ScreenContainer } from '../components/ScreenContainer';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Voting'>;

export function VotingScreen({ navigation, route }: Props) {
  const { players, modeId, suspects, scenario } = route.params;
  const investigatorCount = players.length - 2;

  function handleVote(verdict: Verdict) {
    navigation.navigate('Result', { players, modeId, suspects, scenario, verdict });
  }

  return (
    <ScreenContainer style={styles.container}>
      <View>
        <Text style={styles.title}>Zeit für die Abstimmung</Text>
        <Text style={styles.subtitle}>
          Alle {investigatorCount} Ermittler stimmen jetzt gemeinsam (z. B.
          per Handzeichen) ab: War das Alibi von {suspects.first} und{' '}
          {suspects.second} glaubwürdig?
        </Text>
      </View>

      <View style={styles.optionsBlock}>
        <VoteOption
          emoji="🎭"
          title="Verdächtige haben überzeugt"
          description="Die Geschichte hatte keine Widersprüche – die Verdächtigen gewinnen die Runde."
          onPress={() => handleVote('believed')}
        />
        <VoteOption
          emoji="🚨"
          title="Verdächtige sind aufgeflogen"
          description="Die Ermittler haben einen Widerspruch gefunden – die Ermittler gewinnen die Runde."
          onPress={() => handleVote('caught')}
        />
      </View>
    </ScreenContainer>
  );
}

function VoteOption({
  emoji,
  title,
  description,
  onPress,
}: {
  emoji: string;
  title: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
    >
      <Text style={styles.optionEmoji}>{emoji}</Text>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionDescription}>{description}</Text>
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
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  optionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  optionDescription: {
    color: colors.textMuted,
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },
});
