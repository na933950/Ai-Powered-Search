const express = require('express');
const { search, testSearch, synthesize, testSynthesis } = require('./controller');

const router = express.Router();

router.route('/searches').get(search);
router.route('/test-searches').get(testSearch);

router.route('/synthesis').get(synthesize);
router.route('/test-synthesis').get(testSynthesis);

module.exports = router;