const Job = require('../model/Job');
const { fetchAndSaveJobs } = require('../services/jobFetcher');

const getJobs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const total = await Job.countDocuments();
        const jobs = await Job.find()
            .sort({ postedAt: -1 })
            .skip(skip)
            .limit(limit);

        res.status(200).json({
            success: true,
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            count: jobs.length,
            data: jobs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch jobs',
            error: error.message,
        });
    }
};

const ingestJobs = async (req, res) => {
    try {
        const data = await fetchAndSaveJobs();
        res.status(200).json({
            success: true,
            message: 'Jobs ingested successfully',
            data,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Job ingestion failed',
            error: error.message,
        });
    }
};

module.exports = {
    getJobs,
    ingestJobs,
};
