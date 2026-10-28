/**
 * Offline storage helper for Tambola Number Picker.
 * Persists game state to localStorage so sessions survive refreshes and app reloads.
 */

const STORAGE_KEY = 'tambola_offline_game_state_v1';

export function saveGameState(state) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (err) {
    console.warn('Failed to save Tambola state to localStorage:', err);
  }
}

export function loadGameState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    // Validate structure
    if (
      Array.isArray(parsed.pool) &&
      Array.isArray(parsed.drawHistory) &&
      typeof parsed.isStarted === 'boolean'
    ) {
      return parsed;
    }
    return null;
  } catch (err) {
    console.warn('Failed to parse Tambola state from localStorage:', err);
    return null;
  }
}

export function clearGameState() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.warn('Failed to clear Tambola state from localStorage:', err);
  }
}
