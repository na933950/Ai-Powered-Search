const express = require('express');
const { search } = require('./controller');

const router = express.Router();

router.route('/searches').get(search);

module.exports = router;