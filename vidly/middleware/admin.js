module.exports = function(req, res, next) {
  //401 Unauthorized (no jwt)
  //403 Forbidden
  if (!req.user.isAdmin) return res.status(403).send("access denied.");

  next();
};
