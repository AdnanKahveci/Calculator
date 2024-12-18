export type Operation = '+' | '-' | '×' | '÷' | '√' | '%';

export interface CalculationHistory {
  expression: string;
  result: string;
  timestamp: number;
}

export interface MemoryState {
  value: number;
  hasValue: boolean;
}