import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();  // Ensure your .env file is in the root of your project

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer Token
    console.log('Authorization Header:', authHeader);
    console.log('Token:', token);

    if (token == null) {
        console.log('No token provided');
        return res.sendStatus(401); // if no token, return unauthorized
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
        if (err) {
            console.log('Token verification failed:', err);
            return res.sendStatus(403); // if token is not valid
        }
        req.user = decodedToken;
        console.log('Token is valid, user set:', req.user);
        next();
    });
};

export default authenticateToken;
