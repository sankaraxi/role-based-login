const jwtUtils = require('../utils/jwtUtils');

// Middleware to verify JWT and attach user to request
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).send('Access denied');

  try {
    const decoded = jwtUtils.verifyToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(400).send('Invalid token');
  }
};

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send('Access forbidden: Admins only');
  }
  next();
};

module.exports = { verifyToken, isAdmin };
