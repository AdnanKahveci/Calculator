import { Moon, Sun, Volume2, VolumeX } from 'lucide-react';

interface ControlPanelProps {
  isDark: boolean;
  isMuted: boolean;
  showHistory: boolean;
  onToggleTheme: () => void;
  onToggleMute: () => void;
  onToggleHistory: () => void;
}

export function ControlPanel({
  isDark,
  isMuted,
  showHistory,
  onToggleTheme,
  onToggleMute,
  onToggleHistory,
}: ControlPanelProps) {
  return (
    <div className="flex justify-between items-center mb-4">
      <button
        onClick={onToggleTheme}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:brightness-110 transition-all"
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <button
        onClick={onToggleMute}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:brightness-110 transition-all"
        aria-label={isMuted ? 'Unmute calculator' : 'Mute calculator'}
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>
      <button
        onClick={onToggleHistory}
        className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:brightness-110 transition-all"
      >
        {showHistory ? 'Hide History' : 'Show History'}
      </button>
    </div>
  );
}