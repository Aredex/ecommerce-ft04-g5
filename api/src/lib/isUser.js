module.exports = function (req) {
  if (!req.user) return false;
  if (!req.user.role) return false;
  return true;
};