import type { GameModeId, Suspects, Verdict } from './game';

export type RootStackParamList = {
  Home: undefined;
  PlayerSetup: undefined;
  ModeSelect: { players: string[] };
  Reveal: { players: string[]; modeId: GameModeId };
  Voting: {
    players: string[];
    modeId: GameModeId;
    suspects: Suspects;
    scenario: string;
  };
  Result: {
    players: string[];
    modeId: GameModeId;
    suspects: Suspects;
    scenario: string;
    verdict: Verdict;
  };
};
