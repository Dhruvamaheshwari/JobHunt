import React from 'react';
import { cn } from '../../lib/utils';

export const Card = React.forwardRef(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-950 dark:text-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5',
            className
        )}
        {...props}
    />
));
Card.displayName = 'Card';

export const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-5 pb-3', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-bold text-slate-800 dark:text-slate-100 leading-tight text-base line-clamp-2', className)} {...props} />
));
CardTitle.displayName = 'CardTitle';

export const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-slate-500 dark:text-slate-400', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

export const CardContent = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-5 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';

export const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-5 pt-0 mt-auto', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';
