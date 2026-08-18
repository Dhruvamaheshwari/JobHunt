import React from 'react';

const JobCard = ({ job }) => {
    const formattedDate = job.postedAt
        ? new Date(job.postedAt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
          })
        : 'Recently';

    return (
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-slate-800 line-clamp-2">
                        {job.title}
                    </h3>
                    <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-medium shrink-0">
                        {job.source}
                    </span>
                </div>
                
                <p className="text-sm font-semibold text-indigo-600 mb-3">{job.company}</p>

                <div className="flex flex-wrap gap-4 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1">
                        <span>📍</span>
                        <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span>📅</span>
                        <span>{formattedDate}</span>
                    </div>
                </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between mt-2">
                <span className="text-xs text-slate-400 capitalize">{job.category || 'General'}</span>
                {job.url ? (
                    <a
                        href={job.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded transition-colors"
                    >
                        View Job →
                    </a>
                ) : (
                    <span className="text-xs text-slate-400">No URL</span>
                )}
            </div>
        </div>
    );
};

export default JobCard;
