import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { Verdict } from '../types/game';

interface GameSessionScore {
  suspectsWins: number;
  investigatorsWins: number;
}

interface GameSessionContextValue {
  score: GameSessionScore;
  recordRound: (verdict: Verdict) => void;
  resetScore: () => void;
}

const initialScore: GameSessionScore = { suspectsWins: 0, investigatorsWins: 0 };

const GameSessionContext = createContext<GameSessionContextValue | null>(null);

export function GameSessionProvider({ children }: { children: React.ReactNode }) {
  const [score, setScore] = useState<GameSessionScore>(initialScore);

  const recordRound = useCallback((verdict: Verdict) => {
    setScore((prev) =>
      verdict === 'believed'
        ? { ...prev, suspectsWins: prev.suspectsWins + 1 }
        : { ...prev, investigatorsWins: prev.investigatorsWins + 1 },
    );
  }, []);

  const resetScore = useCallback(() => {
    setScore(initialScore);
  }, []);

  const value = useMemo(
    () => ({ score, recordRound, resetScore }),
    [score, recordRound, resetScore],
  );

  return (
    <GameSessionContext.Provider value={value}>
      {children}
    </GameSessionContext.Provider>
  );
}

export function useGameSession(): GameSessionContextValue {
  const context = useContext(GameSessionContext);
  if (!context) {
    throw new Error('useGameSession muss innerhalb von GameSessionProvider verwendet werden.');
  }
  return context;
}
