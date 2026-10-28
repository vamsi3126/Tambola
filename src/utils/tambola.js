/**
 * Tambola (Housie) number picker logic.
 * Numbers are 1 to 90 inclusive.
 * Uses Fisher-Yates algorithm for reliable, unbiased random shuffling.
 */

export const TOTAL_NUMBERS = 90;

/**
 * Creates and shuffles an array of numbers from 1 to 90.
 * @returns {number[]} Shuffled array of numbers 1..90
 */
export function createShuffledPool() {
  const pool = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool;
}

/**
 * Draws the next number from the remaining pool.
 * @param {number[]} pool
 * @param {Array<{number: number, drawIndex: number}>} drawHistory
 * @returns {{ nextNumber: number, newPool: number[], newHistory: Array<{number: number, drawIndex: number}> } | null}
 */
export function drawNext(pool, drawHistory) {
  if (!pool || pool.length === 0) {
    return null;
  }
  const nextNumber = pool[0];
  const newPool = pool.slice(1);
  const newDrawIndex = drawHistory.length + 1;
  const newHistory = [
    ...drawHistory,
    {
      number: nextNumber,
      drawIndex: newDrawIndex,
      timestamp: Date.now()
    }
  ];

  return {
    nextNumber,
    newPool,
    newHistory
  };
}
