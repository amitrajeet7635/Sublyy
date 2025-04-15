import React from 'react';

const ThemeDebug = ({ onToggle, currentTheme }) => {
  return (
    <div 
      className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 p-2 rounded-lg text-xs shadow-lg opacity-50 hover:opacity-100 cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-text-light dark:text-text-dark font-medium">
            Theme: {currentTheme ? 'Dark' : 'Light'}
          </span>
          <button className="bg-primary text-white dark:bg-secondary dark:text-black px-2 py-1 rounded text-xs">
            Toggle
          </button>
        </div>
        <div className="grid grid-cols-2 gap-1 pt-1 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col">
            <span className="text-text-light dark:text-text-dark">Background:</span>
            <div className="flex gap-1 mt-1">
              <div className="w-4 h-4 bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark rounded"></div>
              <div className="w-4 h-4 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark rounded"></div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-text-light dark:text-text-dark">Text:</span>
            <div className="flex gap-1 mt-1">
              <div className="w-4 h-4 bg-text-light dark:bg-text-dark border border-border-light dark:border-border-dark rounded"></div>
              <div className="w-4 h-4 bg-gray-500 dark:bg-gray-400 border border-border-light dark:border-border-dark rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeDebug;
