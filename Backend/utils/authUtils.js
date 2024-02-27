const jwt = require('jsonwebtoken');

function generateAccessToken(userId) {
  return jwt.sign({ userId }, 'your-secret-key', { expiresIn: '1d' });
}

module.exports = { generateAccessToken };