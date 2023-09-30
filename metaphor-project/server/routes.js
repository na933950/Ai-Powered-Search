const express = require('express');
const { search, test } = require('./controller');

const router = express.Router();

router.route('/searches').get(search);
router.route('/test').get(test);

module.exports = router;