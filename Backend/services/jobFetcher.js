const Job = require('../model/Job');

const fetchAndSaveJobs = async () => {
    const res = await fetch('https://remotive.com/api/remote-jobs?limit=10');
    
    if (!res.ok) {
        throw new Error('Failed to fetch jobs from API');
    }

    const data = await res.json();
    const jobs = data.jobs || [];

    let addedCount = 0;

    for (const job of jobs) {
        const jobId = String(job.id);

        const exists = await Job.findOne({ externalId: jobId });

        if (!exists) {
            await Job.create({
                title: job.title,
                company: job.company_name,
                location: job.candidate_required_location || 'Remote',
                description: job.description || '',
                category: job.category || 'General',
                url: job.url,
                source: 'Remotive API',
                externalId: jobId,
                postedAt: job.publication_date ? new Date(job.publication_date) : new Date(),
            });
            addedCount++;
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
