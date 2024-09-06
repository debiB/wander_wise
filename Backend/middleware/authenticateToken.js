const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; 
    if (!authHeader) return res.status(401).json({ message: 'Access denied. Authorization header is missing.' });

    const token = authHeader.split(" ")[1]; 
    console.log("tokenVerify:", token);
    console.log(process.env.JWT_SECRET)
    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: 'Internal server error. JWT secret is not set.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
       req.user = { id: decoded.userId };
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Token expired.' });
        }
        res.status(401).json({ message: 'Invalid token.' });
    }
}

module.exports = authenticateToken;
