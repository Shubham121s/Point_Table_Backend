const User = require('../models/User');
const ClaimHistory = require('../models/ClaimHistory');

exports.claimPoints = async (req, res) => {
  const { userId } = req.body;
  const randomPoints = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.totalPoints += randomPoints;
  await user.save();

  const history = new ClaimHistory({ userId, pointsClaimed: randomPoints });
  await history.save();

  res.json({ user, randomPoints });
};

exports.getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  const leaderboard = users.map((user, index) => ({
    name: user.name,
    totalPoints: user.totalPoints,
    rank: index + 1,
  }));
  res.json(leaderboard);
};
