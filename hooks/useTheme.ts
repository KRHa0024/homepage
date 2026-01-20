import { useState, useEffect } from 'react';

export type ThemePreference = 'system' | 'light' | 'dark';

export function useTheme() {
  const [theme, setThemeState] = useState<ThemePreference>('system');

  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemePreference | null;
    if (stored === 'dark' || stored === 'light') {
      setThemeState(stored);
    } else {
      setThemeState('system');
    }
  }, []);

  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      let resolved: 'light' | 'dark';

      if (theme === 'dark') {
        resolved = 'dark';
      } else if (theme === 'light') {
        resolved = 'light';
      } else {
        resolved = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }

      root.classList.remove('light', 'dark');
      root.classList.add(resolved);
    };

    applyTheme();

    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handler = () => applyTheme();
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, [theme]);

  const setTheme = (newTheme: ThemePreference) => {
    setThemeState(newTheme);
    if (newTheme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', newTheme);
    }
  };

  return { theme, setTheme };
}
