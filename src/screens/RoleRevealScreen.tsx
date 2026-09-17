import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { ScreenContainer } from '../components/ScreenContainer';
import { PartyButton } from '../components/PartyButton';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'RoleReveal'>;

type TurnRole = 'guilty' | 'innocent' | 'accomplice';

interface Turn {
  name: string;
  role: TurnRole;
}

export function RoleRevealScreen({ navigation, route }: Props) {
  const { players, modeId, suspects, scenario, guilty, accomplices } = route.params;
  const guiltyName = guilty === 'first' ? suspects.first : suspects.second;

  const turns: Turn[] = useMemo(
    () => [
      { name: suspects.first, role: guilty === 'first' ? 'guilty' : 'innocent' },
      { name: suspects.second, role: guilty === 'second' ? 'guilty' : 'innocent' },
      ...accomplices.map((name): Turn => ({ name, role: 'accomplice' })),
    ],
    [suspects, guilty, accomplices],
  );

  const [turnIndex, setTurnIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);

  function handleContinueToVoting() {
    navigation.navigate('Voting', {
      players,
      modeId,
      suspects,
      scenario,
      guilty,
      accomplices,
    });
  }

  if (turnIndex >= turns.length) {
    return (
      <ScreenContainer style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.doneEmoji}>🤫</Text>
          <Text style={styles.title}>Alle Rollen wurden gesehen</Text>
          <Text style={styles.subtitle}>
            Gebt das Gerät jetzt an alle zurück. Die Ermittler befragen{' '}
            {suspects.first} und {suspects.second} nun einzeln – niemand
            außer den Beteiligten kennt die eigene Rolle der anderen.
          </Text>
        </View>
        <PartyButton
          label="Weiter zur Abstimmung"
          onPress={handleContinueToVoting}
        />
      </ScreenContainer>
    );
  }

  const current = turns[turnIndex];

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
        {current.role === 'guilty' && (
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
        )}

        {current.role === 'innocent' && (
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

        {current.role === 'accomplice' && (
          <>
            <Text style={styles.roleEmoji}>🤐</Text>
            <Text style={styles.roleTitle}>Du bist Mitwisser*in</Text>
            <View style={styles.detailCard}>
              <Text style={styles.detailLabel}>Geheimwissen</Text>
              <Text style={styles.detailText}>{guiltyName} ist schuldig.</Text>
            </View>
            <Text style={styles.subtitle}>
              Tu während der Befragung so, als wärst du ein ganz normaler
              Ermittler. Versuch geschickt, den Verdacht von {guiltyName}{' '}
              wegzulenken, ohne dass jemand merkt, dass du es weißt.
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
