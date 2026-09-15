import type { Suspects } from '../types/game';

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
