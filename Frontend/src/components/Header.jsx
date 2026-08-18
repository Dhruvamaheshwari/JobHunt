import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';

const Header = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Brand Title */}
                <div className="flex items-center">
                    <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-100">
                        JobHunt
                    </span>
                </div>

                {/* Right Navigation Controls */}
                <div className="flex items-center gap-4">
                    <span className="text-xs text-slate-500 dark:text-slate-400 hidden sm:inline font-normal">
                        Real-time Remote Job Aggregator
                    </span>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggleTheme}
                        className="h-8 w-8 rounded-md border-slate-200 dark:border-slate-700 bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle dark mode"
                        title="Toggle dark mode"
                    >
                        {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
