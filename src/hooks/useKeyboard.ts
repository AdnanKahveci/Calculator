import { useEffect } from 'react';
import { Operation } from '../types/calculator';

interface KeyboardHandlers {
  onDigit: (digit: string) => void;
  onOperation: (operation: Operation) => void;
  onCalculate: () => void;
  onClear: () => void;
  onDecimal: () => void;
}

export function useKeyboard({
  onDigit,
  onOperation,
  onCalculate,
  onClear,
  onDecimal,
}: KeyboardHandlers) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= '0' && event.key <= '9') {
        onDigit(event.key);
      } else {
        switch (event.key) {
          case '+':
            onOperation('+');
            break;
          case '-':
            onOperation('-');
            break;
          case '*':
            onOperation('×');
            break;
          case '/':
            onOperation('÷');
            break;
          case '%':
            onOperation('%');
            break;
          case 'Enter':
          case '=':
            onCalculate();
            break;
          case 'Escape':
          case 'c':
          case 'C':
            onClear();
            break;
          case '.':
          case ',':
            onDecimal();
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onDigit, onOperation, onCalculate, onClear, onDecimal]);
}