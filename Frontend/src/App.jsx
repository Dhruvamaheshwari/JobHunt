import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import JobCard from './components/JobCard';
import MagicBento from './components/MagicBento';
import { Input } from './components/ui/input';
import { Select } from './components/ui/select';
import { Button } from './components/ui/button';
import { Skeleton } from './components/ui/skeleton';
import { Search, MapPin, Filter, RotateCcw, ChevronLeft, ChevronRight, Inbox, AlertTriangle } from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api/jobs';

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
    const [totalCount, setTotalCount] = useState(0);
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
                setTotalCount(data.total || 0);
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
    }, [page, location, source]);

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
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans overflow-x-hidden transition-colors">
            <Header />

            <main className="max-w-6xl mx-auto px-4 py-8 flex-1 w-full">
                {/* Page Title & Search Bar */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                        <div>
                            <h1 className="text-2xl font-black tracking-tight text-slate-800 dark:text-slate-100">Explore Remote Jobs</h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                                Showing {totalCount} matching active opportunities
                            </p>
                        </div>
                    </div>

                    {/* Filter Card */}
                    <form
                        onSubmit={handleSearchSubmit}
                        className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3.5"
                    >
                        <div className="relative">
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Search Title</label>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="Developer, React, Node..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="pl-8 text-xs dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Location</label>
                            <div className="relative">
                                <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                                <Input
                                    type="text"
                                    placeholder="Remote, USA, Europe..."
                                    value={location}
                                    onChange={(e) => {
                                        setLocation(e.target.value);
                                        setPage(1);
                                    }}
                                    className="pl-8 text-xs dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">Source</label>
                            <div className="relative">
                                <Select
                                    value={source}
                                    onChange={(e) => {
                                        setSource(e.target.value);
                                        setPage(1);
                                    }}
                                    className="text-xs dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100"
                                >
                                    <option value="">All Sources</option>
                                    <option value="Remotive API">Remotive API</option>
                                </Select>
                            </div>
                        </div>

                        <div className="flex items-end gap-2">
                            <Button type="submit" className="flex-1 gap-1.5 text-xs">
                                <Filter className="w-3.5 h-3.5" /> Filter
                            </Button>
                            <Button type="button" variant="outline" onClick={handleClearFilters} className="gap-1 text-xs dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
                                <RotateCcw className="w-3.5 h-3.5" /> Reset
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Loading State using Skeleton Components */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {Array.from({ length: limit }).map((_, idx) => (
                            <div key={idx} className="bg-white dark:bg-slate-900 p-5 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4">
                                <div className="flex justify-between items-start">
                                    <Skeleton className="h-5 w-3/4 dark:bg-slate-800" />
                                    <Skeleton className="h-4 w-16 rounded-full dark:bg-slate-800" />
                                </div>
                                <Skeleton className="h-4 w-1/2 dark:bg-slate-800" />
                                <div className="space-y-2 pt-2">
                                    <Skeleton className="h-3 w-2/3 dark:bg-slate-800" />
                                    <Skeleton className="h-3 w-1/3 dark:bg-slate-800" />
                                </div>
                                <div className="flex justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
                                    <Skeleton className="h-5 w-16 rounded-full dark:bg-slate-800" />
                                    <Skeleton className="h-8 w-20 rounded-lg dark:bg-slate-800" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 rounded-xl p-8 text-center max-w-md mx-auto my-8">
                        <AlertTriangle className="w-10 h-10 text-red-500 mx-auto mb-3" />
                        <h3 className="text-base font-bold text-red-800 dark:text-red-300 mb-1">Failed to load jobs</h3>
                        <p className="text-xs text-red-600 dark:text-red-400 mb-4">{error}</p>
                        <Button variant="default" onClick={fetchJobs} className="bg-red-600 hover:bg-red-700 text-xs">
                            Try Again
                        </Button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && jobs.length === 0 && (
                    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-12 text-center max-w-md mx-auto my-8">
                        <Inbox className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-1">No Jobs Found</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                            No job listings matched your search or filter parameters.
                        </p>
                        <Button variant="outline" onClick={handleClearFilters} className="text-xs dark:bg-slate-800 dark:border-slate-700">
                            Clear Filters
                        </Button>
                    </div>
                )}

                {/* Jobs Grid powered by React Bits MagicBento & Pagination */}
                {!loading && !error && jobs.length > 0 && (
                    <>
                        <MagicBento
                            jobs={jobs}
                            textAutoHide={false}
                            enableStars={true}
                            enableSpotlight={true}
                            enableBorderGlow={true}
                            enableTilt={true}
                            enableMagnetism={true}
                            clickEffect={true}
                            spotlightRadius={300}
                            particleCount={12}
                            glowColor="132, 0, 255"
                        />

                        {/* Pagination UI */}
                        <div className="flex items-center justify-between border-t border-slate-200 dark:border-slate-800 pt-4">
                            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                Page <span className="font-bold text-slate-800 dark:text-slate-200">{page}</span> of{' '}
                                <span className="font-bold text-slate-800 dark:text-slate-200">{totalPages}</span>
                            </span>
                            <div className="flex items-center gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page <= 1}
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    className="gap-1 text-xs"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Previous
                                </Button>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    disabled={page >= totalPages}
                                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                                    className="gap-1 text-xs"
                                >
                                    Next <ChevronRight className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </>
                )}
            </main>

            <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-4 text-center text-xs font-medium text-slate-400 dark:text-slate-500">
                JobHunt © 2026 - Production-Ready Ingestion Portal
            </footer>
        </div>
    );
}

export default App;
