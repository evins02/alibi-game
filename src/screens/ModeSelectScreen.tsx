import React, { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types/navigation';
import { ScreenContainer } from '../components/ScreenContainer';
import { PartyButton } from '../components/PartyButton';
import { GAME_MODES, GameModeId } from '../types/game';
import { colors } from '../theme/colors';
import { radius, spacing } from '../theme/spacing';

type Props = NativeStackScreenProps<RootStackParamList, 'ModeSelect'>;

export function ModeSelectScreen({ navigation, route }: Props) {
  const { players } = route.params;
  const [selected, setSelected] = useState<GameModeId | null>(null);

  function handleContinue() {
    if (!selected) return;
    navigation.navigate('Reveal', { players, modeId: selected });
  }

  return (
    <ScreenContainer>
      <Text style={styles.title}>Wähl deinen Modus</Text>
      <Text style={styles.subtitle}>{players.length} Leute ready</Text>

      <FlatList
        data={GAME_MODES}
        keyExtractor={(mode) => mode.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isSelected = item.id === selected;
          return (
            <Pressable
              onPress={() => setSelected(item.id)}
              style={[styles.card, isSelected && styles.cardSelected]}
            >
              <Text style={styles.cardEmoji}>{item.emoji}</Text>
              <View style={styles.cardText}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            </Pressable>
          );
        }}
      />

      <View style={styles.actions}>
        <PartyButton
          label="Verdächtige auslosen"
          onPress={handleContinue}
          disabled={!selected}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
    gap: spacing.md,
    paddingBottom: spacing.lg,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    gap: spacing.md,
    alignItems: 'flex-start',
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceAlt,
  },
  cardEmoji: {
    fontSize: 32,
  },
  cardText: {
    flex: 1,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  cardDescription: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
  actions: {
    paddingBottom: spacing.lg,
  },
});
