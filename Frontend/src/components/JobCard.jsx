import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Calendar, ExternalLink, Building2 } from 'lucide-react';

const JobCard = ({ job }) => {
    const formattedDate = job.postedAt
        ? new Date(job.postedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
          })
        : 'Recently';

    return (
        <Card className="flex flex-col justify-between h-full group hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200">
            <div>
                <CardHeader>
                    <div className="flex items-start justify-between gap-3">
                        <CardTitle className="group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {job.title}
                        </CardTitle>
                        <Badge variant="default" className="shrink-0 font-medium dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800">
                            {job.source || 'Public API'}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 pt-1">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>{job.company}</span>
                    </div>
                </CardHeader>

                <CardContent className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-1.5 min-w-0">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[200px]">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{formattedDate}</span>
                    </div>
                </CardContent>
            </div>

            <CardFooter className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                <Badge variant="secondary" className="capitalize text-[10px] font-medium max-w-[120px] truncate dark:bg-slate-800 dark:text-slate-300">
                    {job.category || 'General'}
                </Badge>
                {job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="gap-1 text-xs">
                            View Job <ExternalLink className="w-3 h-3" />
                        </Button>
                    </a>
                ) : (
                    <Button size="sm" variant="ghost" disabled>
                        No Link
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
};

export default JobCard;
