const cron = require('node-cron');
const { fetchAndSaveJobs } = require('./services/jobFetcher');

const initScheduler = () => {
    // Run ingestion every 1 hour ('0 * * * *')
    cron.schedule('0 * * * *', async () => {
        console.log('[Scheduler] Starting automated job ingestion...');
        try {
            const result = await fetchAndSaveJobs();
            console.log(`[Scheduler Finished] Ingested: ${result.fetched} | Added: ${result.added}`);
        } catch (err) {
            console.log('[Scheduler Error] Automated ingestion failed:', err.message);
        }
    });

    console.log('[Scheduler Initialized] Automated job ingestion scheduled to run every hour.');
};

module.exports = {
    initScheduler,
};
