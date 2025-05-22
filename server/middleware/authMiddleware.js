const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) =>{
    const token = req.header("Authorization")

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' })
        
    jwt.verify(token.split(" ")[1], "PIJAYA", (err, user) => {
        if(err) return res.status(401).json({ message: 'Invalid token.' })
        
        req.user = user

        next()
    })
}

module.exports = {
    authenticateJWT
}