import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type ThemePreference = 'system' | 'light' | 'dark';

interface ThemeContextType {
  theme: ThemePreference;
  setTheme: (theme: ThemePreference) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemePreference>('system');
  const [mounted, setMounted] = useState(false);

  // 初回マウント時にlocalStorageから読み込み
  useEffect(() => {
    const stored = localStorage.getItem('theme') as ThemePreference | null;
    if (stored === 'dark' || stored === 'light') {
      setThemeState(stored);
    } else {
      setThemeState('system');
    }
    setMounted(true);
  }, []);

  // テーマ変更時にDOMとlocalStorageを更新
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

      // 背景色も同期
      const bg = resolved === 'dark' ? '#111827' : '#ffffff';
      root.style.backgroundColor = bg;
      document.body.style.backgroundColor = bg;
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

  return (
    <ThemeContext.Provider value={{ theme, setTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
