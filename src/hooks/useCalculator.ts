import { useState, useCallback } from 'react';
import { Operation, CalculationHistory, MemoryState } from '../types/calculator';

export function useCalculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operation, setOperation] = useState<Operation | null>(null);
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [memory, setMemory] = useState<MemoryState>({ value: 0, hasValue: false });
  const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);

  const clearDisplay = useCallback(() => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
  }, []);

  const addDigit = useCallback((digit: string) => {
    if (waitingForNewNumber) {
      setDisplay(digit);
      setWaitingForNewNumber(false);
    } else {
      setDisplay(prev => (prev === '0' ? digit : prev + digit));
    }
  }, [waitingForNewNumber]);

  const addDecimal = useCallback(() => {
    if (waitingForNewNumber) {
      setDisplay('0.');
      setWaitingForNewNumber(false);
    } else if (!display.includes('.')) {
      setDisplay(prev => prev + '.');
    }
  }, [display, waitingForNewNumber]);

  const calculate = useCallback(() => {
    if (!previousValue || !operation) return;

    const prev = parseFloat(previousValue);
    const current = parseFloat(display);
    let result = 0;

    switch (operation) {
      case '+': result = prev + current; break;
      case '-': result = prev - current; break;
      case '×': result = prev * current; break;
      case '÷': result = prev / current; break;
      case '%': result = (prev * current) / 100; break;
      case '√': result = Math.sqrt(current); break;
    }

    const expression = `${previousValue} ${operation} ${display}`;
    const formattedResult = result.toString();

    setHistory(prev => [...prev, {
      expression,
      result: formattedResult,
      timestamp: Date.now()
    }]);

    setDisplay(formattedResult);
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewNumber(true);
  }, [display, previousValue, operation]);

  const handleOperation = useCallback((op: Operation) => {
    if (op === '√') {
      const result = Math.sqrt(parseFloat(display));
      setDisplay(result.toString());
      setWaitingForNewNumber(true);
      return;
    }

    if (previousValue && operation && !waitingForNewNumber) {
      calculate();
    }

    setPreviousValue(display);
    setOperation(op);
    setWaitingForNewNumber(true);
  }, [display, previousValue, operation, waitingForNewNumber, calculate]);

  const handleMemory = useCallback((action: 'M+' | 'M-' | 'MR' | 'MC') => {
    const currentValue = parseFloat(display);

    switch (action) {
      case 'M+':
        setMemory(prev => ({
          value: prev.hasValue ? prev.value + currentValue : currentValue,
          hasValue: true
        }));
        setWaitingForNewNumber(true);
        break;
      case 'M-':
        setMemory(prev => ({
          value: prev.hasValue ? prev.value - currentValue : -currentValue,
          hasValue: true
        }));
        setWaitingForNewNumber(true);
        break;
      case 'MR':
        if (memory.hasValue) {
          setDisplay(memory.value.toString());
          setWaitingForNewNumber(true);
        }
        break;
      case 'MC':
        setMemory({ value: 0, hasValue: false });
        break;
    }
  }, [display]);

  return {
    display,
    previousValue,
    operation,
    history,
    memory,
    clearDisplay,
    addDigit,
    addDecimal,
    calculate,
    handleOperation,
    handleMemory
  };
}