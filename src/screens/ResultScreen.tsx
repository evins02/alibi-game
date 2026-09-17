import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import type { Verdict } from '../types/game';
import { ScreenContainer } from '../components/ScreenContainer';
import { PartyButton } from '../components/PartyButton';
import { useGameSession } from '../context/GameSessionContext';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Result'>;

export function ResultScreen({ navigation, route }: Props) {
  const { players, modeId, suspects, scenario, guilty, accomplices, accused } = route.params;
  const { score, recordRound } = useGameSession();

  const guiltyName = guilty === 'first' ? suspects.first : suspects.second;
  const accusedName = accused === 'first' ? suspects.first : suspects.second;
  const caughtRightPerson = accused === guilty;
  const verdict: Verdict = caughtRightPerson ? 'caught' : 'believed';

  // Guard against double-counting if this screen re-renders (e.g. fast refresh).
  const recordedVerdict = useRef<string | null>(null);
  useEffect(() => {
    if (recordedVerdict.current === null) {
      recordedVerdict.current = verdict;
      recordRound(verdict);
    }
  }, [verdict, recordRound]);

  function handleNextRound() {
    navigation.replace('Reveal', { players, modeId });
  }

  function handleEndGame() {
    navigation.popToTop();
  }

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultBlock}>
          <Text style={styles.emoji}>{caughtRightPerson ? '🚨' : '🎭'}</Text>
          <Text style={styles.title}>
            {caughtRightPerson ? 'Busted! 🚨' : 'Clean davongekommen 🎭'}
          </Text>
          <Text style={styles.description}>
            {caughtRightPerson
              ? `Richtig gecheckt! ${guiltyName} war tatsächlich schuldig und ist aufgeflogen.`
              : `Falscher Verdacht! Die Ermittler haben ${accusedName} beschuldigt, aber ${guiltyName} war die/der wahre Täter*in.`}
          </Text>
        </View>

        <View style={styles.truthCard}>
          <Text style={styles.truthLabel}>Was wirklich passiert ist</Text>
          <Text style={styles.truthText}>{scenario.secretDetail}</Text>
        </View>

        {accomplices.length > 0 && (
          <View style={styles.truthCard}>
            <Text style={styles.truthLabel}>
              {accomplices.length === 1 ? 'Der/die Mitwisser*in war' : 'Die Mitwisser*innen waren'}
            </Text>
            <Text style={styles.truthText}>{accomplices.join(', ')}</Text>
          </View>
        )}

        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Punktestand dieser Session</Text>
          <View style={styles.scoreRow}>
            <ScorePill label="Schuldige entkommen" value={score.suspectsWins} />
            <ScorePill label="Ermittler richtig" value={score.investigatorsWins} />
          </View>
        </View>
      </ScrollView>

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
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  scrollContent: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
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
  truthCard: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  truthLabel: {
    color: colors.warning,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  truthText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  scoreCard: {
    backgroundColor: colors.surface,
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
    maxWidth: '45%',
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
    textAlign: 'center',
  },
  actions: {
    gap: spacing.sm,
  },
});
