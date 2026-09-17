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
      'Eine Person ist heimlich wirklich schuldig, die andere komplett unschuldig – aber keiner weiß, wer von beiden, nicht mal sie selbst. Rollen geheim ansehen, dann verhört der Rest die beiden einzeln.',
    emoji: '🕵️',
  },
  {
    id: 'chaos',
    title: 'Chaos-Modus',
    description:
      'Wie Klassisch, aber mit einer verrückten Extra-Regel, die sich die Gruppe vorher ausdenkt (z. B. nur Ja/Nein-Antworten, im Akzent sprechen).',
    emoji: '🌀',
  },
  {
    id: 'speed',
    title: 'Speed-Runde',
    description:
      'Wie Klassisch, aber ihr gebt euch selbst nur ein paar Minuten fürs Verhör, bevor abgestimmt werden muss.',
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

/** Identifies one of the two suspects without needing their name. */
export type SuspectKey = 'first' | 'second';

export interface Scenario {
  /** The incident everyone (suspects and investigators) is told about. */
  incident: string;
  /** What actually happened – shown only to the guilty suspect. */
  secretDetail: string;
}

/** Outcome of a round's accusation: did the investigators catch the guilty suspect? */
export type Verdict = 'believed' | 'caught';
