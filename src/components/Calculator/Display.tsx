interface DisplayProps {
  value: string;
  previousValue?: string | null;
  operation?: string | null;
}

export function Display({ value, previousValue, operation }: DisplayProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg mb-4 transition-colors">
      {previousValue && (
        <div className="text-right text-sm text-gray-500 dark:text-gray-400 mb-1">
          {previousValue} {operation}
        </div>
      )}
      <div className="text-right text-3xl font-bold text-gray-900 dark:text-white font-mono">
        {value}
      </div>
    </div>
  );
}