import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { ScreenContainer } from '../components/ScreenContainer';
import { PartyButton } from '../components/PartyButton';
import { useGameSession } from '../context/GameSessionContext';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export function ResultScreen({ navigation, route }: Props) {
  const { players, modeId, suspects, verdict } = route.params;
  const { score, recordRound } = useGameSession();

  // Guard against double-counting if this screen re-renders (e.g. fast refresh).
  const recordedVerdict = useRef<string | null>(null);
  useEffect(() => {
    if (recordedVerdict.current === null) {
      recordedVerdict.current = verdict;
      recordRound(verdict);
    }
  }, [verdict, recordRound]);

  const suspectsWon = verdict === 'believed';

  function handleNextRound() {
    navigation.replace('Reveal', { players, modeId });
  }

  function handleEndGame() {
    navigation.popToTop();
  }

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.resultBlock}>
        <Text style={styles.emoji}>{suspectsWon ? '🎭' : '🚨'}</Text>
        <Text style={styles.title}>
          {suspectsWon ? 'Die Verdächtigen gewinnen!' : 'Die Ermittler gewinnen!'}
        </Text>
        <Text style={styles.description}>
          {suspectsWon
            ? `${suspects.first} und ${suspects.second} haben mit ihrem Alibi überzeugt.`
            : `Die Ermittler haben einen Widerspruch bei ${suspects.first} und ${suspects.second} gefunden.`}
        </Text>
      </View>

      <View style={styles.scoreCard}>
        <Text style={styles.scoreLabel}>Punktestand dieser Session</Text>
        <View style={styles.scoreRow}>
          <ScorePill label="Verdächtige" value={score.suspectsWins} />
          <ScorePill label="Ermittler" value={score.investigatorsWins} />
        </View>
      </View>

      <View style={styles.actions}>
        <PartyButton label="Nächste Runde" onPress={handleNextRound} />
        <PartyButton
          label="Spiel beenden"
          variant="secondary"
          onPress={handleEndGame}
        />
      </View>
    </ScreenContainer>
  );
}

function ScorePill({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.pill}>
      <Text style={styles.pillValue}>{value}</Text>
      <Text style={styles.pillLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  resultBlock: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 56,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
  },
  description: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    lineHeight: 20,
  },
  scoreCard: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  scoreLabel: {
    color: colors.textFaint,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  pill: {
    alignItems: 'center',
  },
  pillValue: {
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
  },
  pillLabel: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  actions: {
    gap: spacing.sm,
  },
});
