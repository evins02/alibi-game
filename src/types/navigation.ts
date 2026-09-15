import type { GameModeId } from './game';

export type RootStackParamList = {
  Home: undefined;
  PlayerSetup: undefined;
  ModeSelect: { players: string[] };
  Reveal: { players: string[]; modeId: GameModeId };
};
