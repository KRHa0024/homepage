import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme, ThemePreference } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, setTheme, mounted } = useTheme();

  const cycleTheme = () => {
    const order: ThemePreference[] = ['system', 'light', 'dark'];
    const currentIndex = order.indexOf(theme);
    const nextIndex = (currentIndex + 1) % order.length;
    setTheme(order[nextIndex]);
  };

  const icon = {
    system: <Monitor className="w-5 h-5" />,
    light: <Sun className="w-5 h-5" />,
    dark: <Moon className="w-5 h-5" />,
  }[theme];

  const label = {
    system: 'システム設定',
    light: 'ライトモード',
    dark: 'ダークモード',
  }[theme];

  return (
    <button
      onClick={cycleTheme}
      className={`fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-sm hover:bg-pink-50 dark:hover:bg-pink-900/30 hover:border-pink-400 transition-all duration-200 focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 ${!mounted ? 'opacity-0' : 'opacity-100'}`}
      aria-label={`テーマ切り替え: ${label}`}
      title={label}
    >
      <span className="text-gray-700 dark:text-gray-200">{icon}</span>
    </button>
  );
}
