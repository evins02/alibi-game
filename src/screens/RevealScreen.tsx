import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { ScreenContainer } from '../components/ScreenContainer';
import { PartyButton } from '../components/PartyButton';
import { getGameMode } from '../types/game';
import { pickTwoSuspects } from '../utils/random';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'Reveal'>;

export function RevealScreen({ navigation, route }: Props) {
  const { players, modeId } = route.params;
  const mode = getGameMode(modeId);

  // Suspects are drawn once per Reveal screen visit and stay stable across re-renders.
  const suspects = useMemo(() => pickTwoSuspects(players), [players]);

  function handleNewRound() {
    navigation.replace('Reveal', { players, modeId });
  }

  function handleBackToHome() {
    navigation.popToTop();
  }

  return (
    <ScreenContainer style={styles.container}>
      <View>
        <Text style={styles.modeLabel}>
          {mode.emoji} {mode.title}
        </Text>
        <Text style={styles.instructions}>
          Gebt das Gerät jetzt an alle weiter. Nur diese zwei Personen dürfen
          die Verdächtigen sein – alle anderen sind Ermittler.
        </Text>
      </View>

      <View style={styles.suspectsBlock}>
        <SuspectCard label="Verdächtige*r 1" name={suspects.first} />
        <Text style={styles.vs}>&amp;</Text>
        <SuspectCard label="Verdächtige*r 2" name={suspects.second} />
      </View>

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
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
  },
  modeLabel: {
    color: colors.accentSoft,
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
  },
  instructions: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
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
