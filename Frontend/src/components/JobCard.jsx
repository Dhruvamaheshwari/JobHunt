import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Calendar, ExternalLink, Building2, Banknote, Briefcase, Tag } from 'lucide-react';

const getCleanText = (html) => {
    if (!html) return '';
    return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').trim();
};

const JobCard = ({ job }) => {
    const formattedDate = job.postedAt
        ? new Date(job.postedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
          })
        : 'Recently';

    const cleanDescription = getCleanText(job.description);

    return (
        <Card className="flex flex-col justify-between h-full group hover:border-indigo-300 dark:hover:border-indigo-600 transition-all duration-200">
            <div className="space-y-3">
                <CardHeader className="space-y-2">
                    <div className="flex items-start justify-between gap-3">
                        <CardTitle className="text-base font-bold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                            {job.title}
                        </CardTitle>
                        <Badge variant="default" className="shrink-0 font-medium text-[11px]">
                            {job.source || 'Remotive API'}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                        {job.companyLogo ? (
                            <img
                                src={job.companyLogo}
                                alt={job.company}
                                className="w-5 h-5 rounded object-cover border border-slate-200 dark:border-slate-800"
                                onError={(e) => { e.target.style.display = 'none'; }}
                            />
                        ) : (
                            <Building2 className="w-3.5 h-3.5 shrink-0 text-indigo-500" />
                        )}
                        <span>{job.company}</span>
                    </div>
                </CardHeader>

                <CardContent className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 font-medium">
                        <div className="flex items-center gap-1.5 min-w-0">
                            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="break-words">{job.location || 'Remote'}</span>
                        </div>
                        {job.jobType && (
                            <div className="flex items-center gap-1 text-slate-500 capitalize">
                                <Briefcase className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span>{job.jobType}</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1.5 shrink-0">
                            <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{formattedDate}</span>
                        </div>
                    </div>

                    {job.salary && (
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md w-fit">
                            <Banknote className="w-3.5 h-3.5 shrink-0" />
                            <span>{job.salary}</span>
                        </div>
                    )}

                    {job.tags && job.tags.length > 0 && (
                        <div className="flex items-center gap-1 flex-wrap pt-1">
                            <Tag className="w-3 h-3 text-slate-400 shrink-0" />
                            {job.tags.slice(0, 3).map((tag, idx) => (
                                <span key={idx} className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-1.5 py-0.5 rounded font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}

                    {cleanDescription && (
                        <div className="border-t border-slate-100 dark:border-slate-800 pt-2.5">
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                                {cleanDescription}
                            </p>
                        </div>
                    )}
                </CardContent>
            </div>

            <CardFooter className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-3">
                <Badge variant="secondary" className="capitalize text-[11px] font-medium">
                    {job.category || 'General'}
                </Badge>
                {job.url ? (
                    <a href={job.url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" className="gap-1.5 text-xs bg-indigo-600 hover:bg-indigo-700 text-white">
                            View Job <ExternalLink className="w-3.5 h-3.5" />
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
