import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import type { SuspectKey } from '../types/game';
import { ScreenContainer } from '../components/ScreenContainer';
import { PartyButton } from '../components/PartyButton';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'RoleReveal'>;

export function RoleRevealScreen({ navigation, route }: Props) {
  const { players, modeId, suspects, scenario, guilty } = route.params;
  const order: { key: SuspectKey; name: string }[] = [
    { key: 'first', name: suspects.first },
    { key: 'second', name: suspects.second },
  ];

  const [turnIndex, setTurnIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  function handleContinueToVoting() {
    navigation.navigate('Voting', { players, modeId, suspects, scenario, guilty });
  }

  if (turnIndex >= order.length) {
    return (
      <ScreenContainer style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.doneEmoji}>🤫</Text>
          <Text style={styles.title}>Alle Rollen wurden gesehen</Text>
          <Text style={styles.subtitle}>
            Gebt das Gerät jetzt an alle zurück. Die Ermittler befragen{' '}
            {suspects.first} und {suspects.second} nun einzeln – niemand
            außer den beiden selbst kennt ihre eigene Rolle.
          </Text>
        </View>
        <PartyButton
          label="Weiter zur Abstimmung"
          onPress={handleContinueToVoting}
        />
      </ScreenContainer>
    );
  }

  const current = order[turnIndex];
  const isGuilty = current.key === guilty;

  function handleAdvance() {
    setRevealed(false);
    setTurnIndex((prev) => prev + 1);
  }

  if (!revealed) {
    return (
      <ScreenContainer style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.handoffEmoji}>📱</Text>
          <Text style={styles.title}>Gebt das Gerät an</Text>
          <Text style={styles.name}>{current.name}</Text>
          <Text style={styles.subtitle}>
            Alle anderen bitte kurz wegschauen – die Rolle ist geheim.
          </Text>
        </View>
        <PartyButton
          label={`Ich bin ${current.name}, Rolle zeigen`}
          onPress={() => setRevealed(true)}
        />
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.center}>
        {isGuilty ? (
          <>
            <Text style={styles.roleEmoji}>🔴</Text>
            <Text style={styles.roleTitle}>Du bist schuldig</Text>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Was wirklich passiert ist</Text>
              <Text style={styles.detailText}>{scenario.secretDetail}</Text>
            </View>
            <Text style={styles.subtitle}>
              Du kennst die Wahrheit – aber du musst sie verstecken. Denk dir
              glaubwürdige Antworten aus, ohne dich zu verraten.
            </Text>
          </>
        ) : (
          <>
            <Text style={styles.roleEmoji}>🟢</Text>
            <Text style={styles.roleTitle}>Du bist unschuldig</Text>
            <Text style={styles.subtitle}>
              Du weißt nicht, was wirklich passiert ist. Antworte einfach
              ehrlich und aus dem Bauch heraus – auch wenn du dadurch
              verdächtig wirken könntest.
            </Text>
          </>
        )}
      </View>
      <PartyButton
        label="Verstanden, Rolle verstecken"
        onPress={handleAdvance}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    paddingVertical: spacing.xl,
  },
  center: {
    alignItems: 'center',
  },
  handoffEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  doneEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  roleEmoji: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    textAlign: 'center',
  },
  name: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.accentSoft,
    textAlign: 'center',
    marginTop: spacing.xs,
  },
  roleTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    lineHeight: 20,
  },
  detailCard: {
    width: '100%',
    backgroundColor: colors.surfaceAlt,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  detailLabel: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  detailText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
});
