exports.authenticate = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token || token !== 'Bearer hardcoded-token') {
    return res.status(403).send('Forbidden');
  }
  next();
};
