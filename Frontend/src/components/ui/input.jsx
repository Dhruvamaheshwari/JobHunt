import React from 'react';
import { cn } from '../../lib/utils';

export const Input = React.forwardRef(({ className, type = 'text', ...props }, ref) => {
    return (
        <input
            type={type}
            ref={ref}
            className={cn(
                'flex h-9 w-full rounded-lg border border-slate-300 bg-white px-3 py-1 text-xs text-slate-800 shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50',
                className
            )}
            {...props}
        />
    );
});
Input.displayName = 'Input';
