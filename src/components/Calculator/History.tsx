import React from 'react';
import { CalculationHistory } from '../../types/calculator';

interface HistoryProps {
  history: CalculationHistory[];
}

export function History({ history }: HistoryProps) {
  return (
    <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-lg transition-colors">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">History</h3>
      <div className="max-h-40 overflow-y-auto">
        {history.map((entry, index) => (
          <div
            key={entry.timestamp}
            className="py-2 border-b border-gray-200 dark:border-gray-700 last:border-0"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400">{entry.expression}</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{entry.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
}