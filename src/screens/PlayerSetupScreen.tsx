import React, { useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { ScreenContainer } from '../components/ScreenContainer';
import { PartyButton } from '../components/PartyButton';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'PlayerSetup'>;

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 10;

export function PlayerSetupScreen({ navigation }: Props) {
  const [names, setNames] = useState<string[]>(['', '', '']);
  const [error, setError] = useState<string | null>(null);

  function updateName(index: number, value: string) {
    setNames((prev) => prev.map((n, i) => (i === index ? value : n)));
    setError(null);
  }

  function addPlayer() {
    if (names.length >= MAX_PLAYERS) return;
    setNames((prev) => [...prev, '']);
  }

  function removePlayer(index: number) {
    if (names.length <= MIN_PLAYERS) return;
    setNames((prev) => prev.filter((_, i) => i !== index));
  }

  function handleContinue() {
    const trimmed = names.map((n) => n.trim()).filter((n) => n.length > 0);

    if (trimmed.length < MIN_PLAYERS) {
      setError(`Bitte gib mindestens ${MIN_PLAYERS} Spielernamen ein.`);
      return;
    }

    const unique = new Set(trimmed.map((n) => n.toLowerCase()));
    if (unique.size !== trimmed.length) {
      setError('Alle Spielernamen müssen eindeutig sein.');
      return;
    }

    navigation.navigate('ModeSelect', { players: trimmed });
  }

  return (
    <ScreenContainer>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Text style={styles.title}>Wer spielt mit?</Text>
        <Text style={styles.subtitle}>
          {names.length}/{MAX_PLAYERS} Spieler · mindestens {MIN_PLAYERS}
        </Text>

        <FlatList
          data={names}
          keyExtractor={(_, index) => String(index)}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <View style={styles.row}>
              <Text style={styles.rowIndex}>{index + 1}</Text>
              <TextInput
                value={item}
                onChangeText={(value) => updateName(index, value)}
                placeholder={`Spieler ${index + 1}`}
                placeholderTextColor={colors.textFaint}
                style={styles.input}
                returnKeyType="done"
                maxLength={20}
              />
              {names.length > MIN_PLAYERS && (
                <Text
                  style={styles.removeButton}
                  onPress={() => removePlayer(index)}
                >
                  ✕
                </Text>
              )}
            </View>
          )}
          ListFooterComponent={
            names.length < MAX_PLAYERS ? (
              <PartyButton
                label="+ Spieler hinzufügen"
                variant="ghost"
                onPress={addPlayer}
              />
            ) : null
          }
        />

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.actions}>
          <PartyButton label="Weiter" onPress={handleContinue} />
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginTop: spacing.lg,
  },
  subtitle: {
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  listContent: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  rowIndex: {
    color: colors.textFaint,
    fontWeight: '700',
    width: 20,
    textAlign: 'center',
  },
  input: {
    flex: 1,
    color: colors.text,
    paddingVertical: spacing.md,
    fontSize: 16,
  },
  removeButton: {
    color: colors.danger,
    fontSize: 18,
    fontWeight: '700',
    paddingHorizontal: spacing.sm,
  },
  error: {
    color: colors.danger,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  actions: {
    paddingBottom: spacing.lg,
  },
});
