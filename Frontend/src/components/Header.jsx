import React from 'react';
import { Briefcase, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { Button } from './ui/button';

const Header = () => {
    const { darkMode, toggleTheme } = useTheme();

    return (
        <header className="sticky top-0 z-50 bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xs text-white border-b border-slate-800 shadow-xs">
            <div className="max-w-6xl mx-auto px-4 py-3.5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-xs">
                        <Briefcase className="w-4 h-4" />
                    </div>
                    <span className="text-xl font-black tracking-tight text-white">
                        Job<span className="text-indigo-400">Hunt</span>
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-md border border-indigo-500/30">
                        Ingestion Engine
                    </span>
                </div>

                <div className="flex items-center gap-3">
                    <p className="text-xs text-slate-400 hidden sm:block font-medium">
                        Real-time Remote Job Aggregator
                    </p>
                    {/* Theme Toggle Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                        title="Toggle theme"
                    >
                        {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-300" />}
                    </Button>
                </div>
            </div>
        </header>
    );
};

export default Header;
