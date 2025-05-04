import Users from "../models/user.js";

// Get user settings and general info
export const getUserSettings = async (req, res) => {
  try {
    const user = await Users.findById(req.user.userId).select("username email profilePic settings");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch settings" });
  }
};

// Update user settings and general info
export const updateUserSettings = async (req, res) => {
  try {
    const { username, email, profilePic, settings } = req.body;
    const update = {};
    if (username) update.username = username;
    if (email) update.email = email;
    if (profilePic) update.profilePic = profilePic;
    if (settings) {
      for (const key in settings) {
        update[`settings.${key}`] = settings[key];
      }
    }
    const user = await Users.findByIdAndUpdate(
      req.user.userId,
      { $set: update },
      { new: true }
    ).select("username email profilePic settings");

    // Emit socket event to this user
    const io = req.app.get("io");
    const userSockets = req.app.get("userSockets");
    const socketId = userSockets.get(req.user.userId);
    if (io && socketId) {
      io.to(socketId).emit("settingsUpdated", user);
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to update settings" });
  }
};
