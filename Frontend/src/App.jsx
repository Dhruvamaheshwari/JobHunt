import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import JobCard from './components/JobCard';

const API_BASE_URL = 'http://localhost:4000/api/jobs';

function App() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(API_BASE_URL);
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
            const data = await res.json();
            if (data.success) {
                setJobs(data.data || []);
            } else {
                throw new Error(data.message || 'Failed to fetch jobs');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Job Listings</h1>
                        <p className="text-sm text-slate-500">Explore latest fetched opportunities</p>
                    </div>
                    <button
                        onClick={fetchJobs}
                        className="text-sm font-medium bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded transition-colors"
                    >
                        Refresh 🔄
                    </button>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-3"></div>
                        <p className="text-sm">Loading jobs from server...</p>
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md mx-auto my-8">
                        <p className="text-red-600 font-semibold mb-2">Failed to load jobs</p>
                        <p className="text-sm text-red-500 mb-4">{error}</p>
                        <button
                            onClick={fetchJobs}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && jobs.length === 0 && (
                    <div className="bg-white border border-slate-200 rounded-lg p-12 text-center max-w-md mx-auto my-8">
                        <p className="text-4xl mb-3">📭</p>
                        <h3 className="text-lg font-bold text-slate-700 mb-1">No Jobs Found</h3>
                        <p className="text-sm text-slate-500">
                            There are currently no job listings available in the database.
                        </p>
                    </div>
                )}

                {/* Jobs Grid */}
                {!loading && !error && jobs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <JobCard key={job._id || job.externalId} job={job} />
                        ))}
                    </div>
                )}
            </main>

            <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
                JobHunt © 2026 - Simple & Clean Ingestion System
            </footer>
        </div>
    );
}

export default App;
