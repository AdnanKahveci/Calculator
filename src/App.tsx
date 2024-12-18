import React from 'react';
import { ControlPanel } from './components/Calculator/ControlPanel';
import { Display } from './components/Calculator/Display';
import { Keypad } from './components/Calculator/Keypad';
import { History } from './components/Calculator/History';
import { useCalculator } from './hooks/useCalculator';
import { useTheme } from './hooks/useTheme';
import { useSound } from './hooks/useSound';
import { useKeyboard } from './hooks/useKeyboard';
import { Operation } from './types/calculator';

function App() {
  const calculator = useCalculator();
  const { isDark, toggleTheme } = useTheme();
  const [isMuted, setIsMuted] = React.useState(true);
  const [showHistory, setShowHistory] = React.useState(false);
  const { playButtonSound } = useSound(isMuted);

  // Wrap calculator functions to include sound
  const handleDigit = (digit: string) => {
    playButtonSound();
    calculator.addDigit(digit);
  };

  const handleOperation = (operation: Operation) => {
    playButtonSound();
    calculator.handleOperation(operation);
  };

  const handleCalculate = () => {
    playButtonSound();
    calculator.calculate();
  };

  const handleMemory = (action: 'M+' | 'M-' | 'MR' | 'MC') => {
    playButtonSound();
    calculator.handleMemory(action);
  };

  const handleDecimal = () => {
    playButtonSound();
    calculator.addDecimal();
  };

  const handleClear = () => {
    playButtonSound();
    calculator.clearDisplay();
  };

  // Set up keyboard handlers
  useKeyboard({
    onDigit: handleDigit,
    onOperation: handleOperation,
    onCalculate: handleCalculate,
    onClear: handleClear,
    onDecimal: handleDecimal,
  });

  return (
    <div className={`min-h-screen ${isDark ? 'dark' : ''} bg-gray-100 dark:bg-gray-900 p-4 transition-colors duration-300`}>
      <div className="max-w-md mx-auto">
        <ControlPanel
          isDark={isDark}
          isMuted={isMuted}
          showHistory={showHistory}
          onToggleTheme={toggleTheme}
          onToggleMute={() => setIsMuted(!isMuted)}
          onToggleHistory={() => setShowHistory(!showHistory)}
        />

        <Display
          value={calculator.display}
          previousValue={calculator.previousValue}
          operation={calculator.operation}
        />

        <Keypad
          onDigitClick={handleDigit}
          onOperationClick={handleOperation}
          onMemoryClick={handleMemory}
          onClearClick={handleClear}
          onDecimalClick={handleDecimal}
          onCalculate={handleCalculate}
        />

        {showHistory && <History history={calculator.history} />}
      </div>
    </div>
  );
}

export default App;