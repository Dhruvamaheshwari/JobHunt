import React from 'react';
import { cn } from '../../lib/utils';

export const Badge = React.forwardRef(({ className, variant = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2';

    const variants = {
        default: 'border-transparent bg-indigo-100 text-indigo-700 hover:bg-indigo-200',
        secondary: 'border-transparent bg-slate-100 text-slate-700 hover:bg-slate-200',
        outline: 'border-slate-200 text-slate-600',
    };

    return <span ref={ref} className={cn(baseStyles, variants[variant], className)} {...props} />;
});
Badge.displayName = 'Badge';
