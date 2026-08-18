const express = require('express');
const router = express.Router();
const { getJobs, ingestJobs } = require('../controller/jobController');

router.get('/', getJobs);
router.post('/ingest', ingestJobs);

module.exports = router;
