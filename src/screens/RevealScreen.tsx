import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { ScreenContainer } from '../components/ScreenContainer';
import { PartyButton } from '../components/PartyButton';
import { getGameMode } from '../types/game';
import { pickTwoSuspects, pickRandomScenario } from '../utils/random';
import { SCENARIOS } from '../data/scenarios';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Reveal'>;

export function RevealScreen({ navigation, route }: Props) {
  const { players, modeId } = route.params;
  const mode = getGameMode(modeId);

  // Suspects and scenario are drawn once per Reveal screen visit and stay
  // stable across re-renders; a "new round" replaces the whole screen so a
  // fresh combination gets picked.
  const suspects = useMemo(() => pickTwoSuspects(players), [players]);
  const scenario = useMemo(() => pickRandomScenario(SCENARIOS), [players]);

  function handleNewRound() {
    navigation.replace('Reveal', { players, modeId });
  }

  function handleBackToHome() {
    navigation.popToTop();
  }

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.modeLabel}>
          {mode.emoji} {mode.title}
        </Text>

        <View style={styles.scenarioCard}>
          <Text style={styles.scenarioLabel}>Der Vorfall</Text>
          <Text style={styles.scenarioText}>{scenario}</Text>
        </View>

        <Text style={styles.instructions}>
          Gebt das Gerät jetzt an alle weiter. Nur diese zwei Personen dürfen
          die Verdächtigen sein – sie ziehen sich zurück und erfinden ein
          gemeinsames Alibi für den Vorfall oben. Alle anderen sind Ermittler.
        </Text>

        <View style={styles.suspectsBlock}>
          <SuspectCard label="Verdächtige*r 1" name={suspects.first} />
          <Text style={styles.vs}>&amp;</Text>
          <SuspectCard label="Verdächtige*r 2" name={suspects.second} />
        </View>
      </ScrollView>

      <View style={styles.actions}>
        <PartyButton label="Neue Auslosung" onPress={handleNewRound} />
        <PartyButton
          label="Zurück zum Start"
          variant="secondary"
          onPress={handleBackToHome}
        />
      </View>
    </ScreenContainer>
  );
}

function SuspectCard({ label, name }: { label: string; name: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardLabel}>{label}</Text>
      <Text style={styles.cardName}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  scrollContent: {
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  modeLabel: {
    color: colors.accentSoft,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  scenarioCard: {
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  scenarioLabel: {
    color: colors.warning,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  scenarioText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
  },
  instructions: {
    color: colors.textMuted,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
    lineHeight: 20,
  },
  suspectsBlock: {
    alignItems: 'center',
    gap: spacing.md,
  },
  card: {
    width: '100%',
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 0 },
  },
  cardLabel: {
    color: colors.textFaint,
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  cardName: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '800',
    textAlign: 'center',
  },
  vs: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: '800',
  },
  actions: {
    gap: spacing.sm,
  },
});
