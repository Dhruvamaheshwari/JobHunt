import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import JobCard from './components/JobCard';

const API_BASE_URL = 'http://localhost:4000/api/jobs';

function App() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter and Pagination state
    const [search, setSearch] = useState('');
    const [location, setLocation] = useState('');
    const [source, setSource] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 6;

    const fetchJobs = async () => {
        setLoading(true);
        setError(null);
        try {
            const queryParams = new URLSearchParams({
                page,
                limit,
                ...(search && { search }),
                ...(location && { location }),
                ...(source && { source }),
            });

            const res = await fetch(`${API_BASE_URL}?${queryParams.toString()}`);
            if (!res.ok) {
                throw new Error(`Server error: ${res.status}`);
            }
            const data = await res.json();
            if (data.success) {
                setJobs(data.data || []);
                setTotalPages(data.totalPages || 1);
            } else {
                throw new Error(data.message || 'Failed to fetch jobs');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch jobs whenever page, location, or source changes
    useEffect(() => {
        fetchJobs();
    }, [page, location, source]);

    // Handle Search form submission
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setPage(1);
        fetchJobs();
    };

    const handleClearFilters = () => {
        setSearch('');
        setLocation('');
        setSource('');
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold text-slate-800 mb-1">Job Listings</h1>
                    <p className="text-sm text-slate-500 mb-6">Explore latest fetched opportunities</p>

                    {/* Filter & Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Search Title</label>
                            <input
                                type="text"
                                placeholder="e.g. Developer, React..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Location</label>
                            <input
                                type="text"
                                placeholder="e.g. Remote, USA..."
                                value={location}
                                onChange={(e) => {
                                    setLocation(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-600 mb-1">Source</label>
                            <select
                                value={source}
                                onChange={(e) => {
                                    setSource(e.target.value);
                                    setPage(1);
                                }}
                                className="w-full px-3 py-2 text-sm border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
                            >
                                <option value="">All Sources</option>
                                <option value="Remotive API">Remotive API</option>
                            </select>
                        </div>

                        <div className="flex items-end gap-2">
                            <button
                                type="submit"
                                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm py-2 px-4 rounded transition-colors"
                            >
                                Search
                            </button>
                            <button
                                type="button"
                                onClick={handleClearFilters}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-medium text-sm py-2 px-3 rounded transition-colors"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
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
                            No job listings matched your filter criteria. Try clearing filters.
                        </p>
                    </div>
                )}

                {/* Jobs Grid */}
                {!loading && !error && jobs.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {jobs.map((job) => (
                                <JobCard key={job._id || job.externalId} job={job} />
                            ))}
                        </div>

                        {/* Pagination Controls */}
                        <div className="flex items-center justify-between border-t border-slate-200 pt-4">
                            <span className="text-sm text-slate-500">
                                Page <span className="font-semibold text-slate-700">{page}</span> of{' '}
                                <span className="font-semibold text-slate-700">{totalPages}</span>
                            </span>
                            <div className="flex gap-2">
                                <button
                                    disabled={page <= 1}
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    className="px-3 py-1.5 text-sm font-medium border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous
                                </button>
                                <button
                                    disabled={page >= totalPages}
                                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                    className="px-3 py-1.5 text-sm font-medium border border-slate-300 rounded bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </main>

            <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-400">
                JobHunt © 2026 - Simple & Clean Ingestion System
            </footer>
        </div>
    );
}

export default App;
