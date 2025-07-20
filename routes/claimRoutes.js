const express = require('express');
const router = express.Router();
const { claimPoints, getLeaderboard } = require('../controllers/claimController');

router.post('/claim', claimPoints);
router.get('/leaderboard', getLeaderboard);

module.exports = router;
