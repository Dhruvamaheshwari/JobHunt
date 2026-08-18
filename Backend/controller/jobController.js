const Job = require('../model/Job');

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find().sort({ postedAt: -1 });
        res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Server Error: Unable to fetch jobs',
            error: error.message,
        });
    }
};

module.exports = {
    getJobs,
};
