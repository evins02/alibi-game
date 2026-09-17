import type { GameModeId, Scenario, SuspectKey, Suspects, Verdict } from './game';

export type RootStackParamList = {
  Home: undefined;
  PlayerSetup: undefined;
  ModeSelect: { players: string[] };
  Reveal: { players: string[]; modeId: GameModeId };
  RoleReveal: {
    players: string[];
    modeId: GameModeId;
    suspects: Suspects;
    scenario: Scenario;
    guilty: SuspectKey;
    accomplices: string[];
  };
  Voting: {
    players: string[];
    modeId: GameModeId;
    suspects: Suspects;
    scenario: Scenario;
    guilty: SuspectKey;
    accomplices: string[];
  };
  Result: {
    players: string[];
    modeId: GameModeId;
    suspects: Suspects;
    scenario: Scenario;
    guilty: SuspectKey;
    accomplices: string[];
    accused: SuspectKey;
  };
};
