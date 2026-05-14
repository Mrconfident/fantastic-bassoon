const User = require("../models/User");
const Event = require("../models/Event");
exports.getStats = (req, res) => {
  try {
    const events = Event.getAll();
    const users = User.getAll();

    res.status(200).json({
      message: "Stats retrieved successfully",
      success: true,
      stats: {
        events: events,
        users: users,
        totalEvents: events.length,
        totalUsers: users.length,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error retrieving stats", success: false });
  }
};
