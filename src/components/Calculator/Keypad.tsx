import React from 'react';
import { Button } from './Button';
import { Operation } from '../../types/calculator';

interface KeypadProps {
  onDigitClick: (digit: string) => void;
  onOperationClick: (operation: Operation) => void;
  onMemoryClick: (action: 'M+' | 'M-' | 'MR' | 'MC') => void;
  onClearClick: () => void;
  onDecimalClick: () => void;
  onCalculate: () => void;
}

export function Keypad({
  onDigitClick,
  onOperationClick,
  onMemoryClick,
  onClearClick,
  onDecimalClick,
  onCalculate,
}: KeypadProps) {
  return (
    <div className="grid grid-cols-4 gap-2">
      <Button variant="secondary" onClick={() => onMemoryClick('MC')}>MC</Button>
      <Button variant="secondary" onClick={() => onMemoryClick('MR')}>MR</Button>
      <Button variant="secondary" onClick={() => onMemoryClick('M+')}>M+</Button>
      <Button variant="secondary" onClick={() => onMemoryClick('M-')}>M-</Button>

      <Button variant="secondary" onClick={onClearClick}>C</Button>
      <Button variant="secondary" onClick={() => onOperationClick('√')}>√</Button>
      <Button variant="secondary" onClick={() => onOperationClick('%')}>%</Button>
      <Button variant="accent" onClick={() => onOperationClick('÷')}>÷</Button>

      <Button onClick={() => onDigitClick('7')}>7</Button>
      <Button onClick={() => onDigitClick('8')}>8</Button>
      <Button onClick={() => onDigitClick('9')}>9</Button>
      <Button variant="accent" onClick={() => onOperationClick('×')}>×</Button>

      <Button onClick={() => onDigitClick('4')}>4</Button>
      <Button onClick={() => onDigitClick('5')}>5</Button>
      <Button onClick={() => onDigitClick('6')}>6</Button>
      <Button variant="accent" onClick={() => onOperationClick('-')}>-</Button>

      <Button onClick={() => onDigitClick('1')}>1</Button>
      <Button onClick={() => onDigitClick('2')}>2</Button>
      <Button onClick={() => onDigitClick('3')}>3</Button>
      <Button variant="accent" onClick={() => onOperationClick('+')}>+</Button>

      <Button onClick={() => onDigitClick('0')}>0</Button>
      <Button onClick={onDecimalClick}>.</Button>
      <Button
        variant="accent"
        className="col-span-2"
        onClick={onCalculate}
      >=</Button>
    </div>
  );
}