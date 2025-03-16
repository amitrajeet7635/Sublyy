import jwt from "jsonwebtoken"

export const verifyToken = (req, res,next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
        res.status(200).json({ message: 'Token is valid' });
        req.user = decoded;
        next();
    });

}

