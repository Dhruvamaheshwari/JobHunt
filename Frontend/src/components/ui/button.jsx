import React from 'react';
import { cn } from '../../lib/utils';

export const Button = React.forwardRef(({ className, variant = 'default', size = 'default', disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:pointer-events-none disabled:opacity-50 cursor-pointer';

    const variants = {
        default: 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800 shadow-sm',
        outline: 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 border-slate-200',
        secondary: 'bg-slate-100 text-slate-700 hover:bg-slate-200',
        ghost: 'hover:bg-slate-100 text-slate-600',
    };

    const sizes = {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-5 text-sm',
        icon: 'h-8 w-8 p-0',
    };

    return (
        <button
            ref={ref}
            disabled={disabled}
            className={cn(baseStyles, variants[variant], sizes[size], className)}
            {...props}
        />
    );
});
Button.displayName = 'Button';
