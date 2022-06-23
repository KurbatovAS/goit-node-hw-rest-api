const signup = require("./signup");
const login = require("./login");
const logout = require("./logout");
const getCurrent = require("./getCurrent");
const updateUserSubscription = require("./updateUserSubscription");
const updateAvatar = require("./updateAvatar");
const verifyEmail = require("./verifyEmail");

module.exports = {
  signup,
  login,
  logout,
  getCurrent,
  updateUserSubscription,
  updateAvatar,
  verifyEmail,
};
