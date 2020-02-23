const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (req, res, next) => {
    let token;
    let secret = 'SECRET#123';
    if ('authorization' in req.headers){
        token = req.headers['authorization'].split(' ')[1];
    }
        

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        
        jwt.verify(token, secret,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    req._id = decoded._id;
                    req.email = decoded.email;
                    req.role = decoded.role;
                    req.cart = decoded.cart;
                    next();
                }
            }
        )
    }
}