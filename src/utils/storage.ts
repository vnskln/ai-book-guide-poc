/**
 * Load data from session storage
 * @param key The key to load from
 * @returns The stored data or null if not found
 */
export function loadFromStorage(key: string): string | null {
  try {
    return sessionStorage.getItem(`ai-book-guide-${key}`);
  } catch (error) {
    console.error('Error loading from session storage:', error);
    return null;
  }
}

/**
 * Save data to session storage
 * @param key The key to save under
 * @param value The value to save
 */
export function saveToStorage(key: string, value: string): void {
  try {
    sessionStorage.setItem(`ai-book-guide-${key}`, value);
  } catch (error) {
    console.error('Error saving to session storage:', error);
  }
}

/**
 * Clear a specific item from session storage
 * @param key The key to clear
 */
export function clearFromStorage(key: string): void {
  try {
    sessionStorage.removeItem(`ai-book-guide-${key}`);
  } catch (error) {
    console.error('Error clearing from session storage:', error);
  }
}

/**
 * Clear all application data from session storage
 */
export function clearAllStorage(): void {
  try {
    const keysToRemove = [];
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.startsWith('ai-book-guide-')) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => sessionStorage.removeItem(key));
  } catch (error) {
    console.error('Error clearing all session storage:', error);
  }
}