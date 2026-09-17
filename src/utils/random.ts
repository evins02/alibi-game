import type { Scenario, SuspectKey, Suspects } from '../types/game';

/** Picks two distinct random players from the list, order does not matter. */
export function pickTwoSuspects(players: string[]): Suspects {
  if (players.length < 3) {
    throw new Error('Es werden mindestens 3 Spieler benötigt.');
  }

  const pool = [...players];
  const firstIndex = Math.floor(Math.random() * pool.length);
  const [first] = pool.splice(firstIndex, 1);
  const secondIndex = Math.floor(Math.random() * pool.length);
  const [second] = pool.splice(secondIndex, 1);

  return { first, second };
}

/** Picks one random entry from a non-empty list of scenarios. */
export function pickRandomScenario(scenarios: Scenario[]): Scenario {
  if (scenarios.length === 0) {
    throw new Error('Es sind keine Szenarien verfügbar.');
  }
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

/** Coin flip deciding which of the two suspects is secretly guilty. */
export function pickGuiltySuspect(): SuspectKey {
  return Math.random() < 0.5 ? 'first' : 'second';
}

/** How many secret accomplices ("Mitwisser") a group this size should get. */
export function getAccompliceCount(playerCount: number): number {
  if (playerCount >= 8) return 2;
  if (playerCount >= 6) return 1;
  return 0;
}

/** Picks `count` random accomplices from the players who are not suspects. */
export function pickAccomplices(
  players: string[],
  suspects: Suspects,
  count: number,
): string[] {
  const pool = players.filter(
    (player) => player !== suspects.first && player !== suspects.second,
  );

  const accomplices: string[] = [];
  for (let i = 0; i < count && pool.length > 0; i++) {
    const index = Math.floor(Math.random() * pool.length);
    accomplices.push(pool.splice(index, 1)[0]);
  }
  return accomplices;
}
