import React from 'react';

const Header = () => {
    return (
        <header className="bg-slate-900 text-white shadow-md">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-indigo-400">JobHunt</span>
                    <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
                        Portal
                    </span>
                </div>
                <p className="text-sm text-slate-400 hidden sm:block">
                    Discover & Ingest Remote Opportunities
                </p>
            </div>
        </header>
    );
};

export default Header;
