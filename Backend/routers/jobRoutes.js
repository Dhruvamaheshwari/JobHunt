const express = require('express');
const router = express.Router();
const { getJobs } = require('../controller/jobController');

router.get('/', getJobs);

module.exports = router;
