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
    const data = await fetchWithRetry('https://remotive.com/api/remote-jobs?limit=20');
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
                    jobType: job.job_type ? job.job_type.replace('_', ' ') : 'Full-time',
                    salary: job.salary || '',
                    tags: Array.isArray(job.tags) ? job.tags : [],
                    companyLogo: job.company_logo || job.company_logo_url || '',
                    url: job.url || '',
                    source: 'Remotive API',
                    externalId: jobId,
                    postedAt: job.publication_date ? new Date(job.publication_date) : new Date(),
                });
                addedCount++;
            } else {
                // Optionally update missing extra fields for existing jobs
                let updated = false;
                if (!exists.jobType && job.job_type) {
                    exists.jobType = job.job_type.replace('_', ' ');
                    updated = true;
                }
                if (!exists.salary && job.salary) {
                    exists.salary = job.salary;
                    updated = true;
                }
                if ((!exists.tags || exists.tags.length === 0) && Array.isArray(job.tags)) {
                    exists.tags = job.tags;
                    updated = true;
                }
                if (!exists.companyLogo && (job.company_logo || job.company_logo_url)) {
                    exists.companyLogo = job.company_logo || job.company_logo_url;
                    updated = true;
                }
                if (updated) {
                    await exists.save();
                }
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
