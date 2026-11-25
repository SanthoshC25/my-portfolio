import { useEffect } from 'react';

/**
 * useTheme — Locked permanently to Dark Cinematic Marvel mode.
 * Cleans up any legacy light mode storage so the interface remains
 * in high-contrast dark space theme.
 */
export default function useTheme() {
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark');
    try {
      localStorage.removeItem('portfolio-theme');
    } catch {
      // ignore
    }
  }, []);

  return {
    theme: 'dark',
    toggleTheme: () => {},
    isDark: true,
  };
}
