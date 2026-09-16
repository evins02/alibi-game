export type GameModeId = 'classic' | 'chaos' | 'speed';

export interface GameMode {
  id: GameModeId;
  title: string;
  description: string;
  emoji: string;
}

export const GAME_MODES: GameMode[] = [
  {
    id: 'classic',
    title: 'Klassisch',
    description:
      'Die zwei Verdächtigen verlassen den Raum und erfinden gemeinsam ein Alibi. Die restliche Gruppe befragt sie einzeln.',
    emoji: '🕵️',
  },
  {
    id: 'chaos',
    title: 'Chaos-Modus',
    description:
      'Wie Klassisch, aber mit einer verrückten Zusatzregel, die sich die Gruppe vorher ausdenkt (z. B. nur flüstern, ein Wort pro Antwort).',
    emoji: '🌀',
  },
  {
    id: 'speed',
    title: 'Speed-Runde',
    description:
      'Die Verdächtigen haben nur 60 Sekunden, um ihr Alibi abzustimmen, bevor die Befragung beginnt.',
    emoji: '⏱️',
  },
];

export function getGameMode(id: GameModeId): GameMode {
  const mode = GAME_MODES.find((m) => m.id === id);
  if (!mode) {
    throw new Error(`Unbekannter Spielmodus: ${id}`);
  }
  return mode;
}

export interface Suspects {
  first: string;
  second: string;
}

/** Outcome of a round's group vote: did the suspects convince everyone? */
export type Verdict = 'believed' | 'caught';
