const Job = require('../model/Job');

// Helper function to fetch API with simple retry logic
const fetchWithRetry = async (url) => {
    for (let i = 1; i <= 3; i++) {
        try {
            const res = await fetch(url);
            if (res.ok) return await res.json();
        } catch (err) {
            console.log(`Retry ${i} failed`);
        }
    }
    throw new Error('API request failed');
};

const fetchAndSaveJobs = async () => {
    const data = await fetchWithRetry('https://remotive.com/api/remote-jobs?limit=10');
    const jobs = data.jobs || [];

    let addedCount = 0;

    for (const job of jobs) {
        // Validation check
        if (!job.id || !job.title || !job.company_name) continue;

        const jobId = String(job.id);

        try {
            const exists = await Job.findOne({ externalId: jobId });

            if (!exists) {
                await Job.create({
                    title: job.title,
                    company: job.company_name,
                    location: job.candidate_required_location || 'Remote',
                    description: job.description || '',
                    category: job.category || 'General',
                    url: job.url || '',
                    source: 'Remotive API',
                    externalId: jobId,
                    postedAt: job.publication_date ? new Date(job.publication_date) : new Date(),
                });
                addedCount++;
            }
        } catch (dbErr) {
            console.log(`Failed to save job ${jobId}`);
        }
    }

    return {
        fetched: jobs.length,
        added: addedCount,
    };
};

module.exports = {
    fetchAndSaveJobs,
};

