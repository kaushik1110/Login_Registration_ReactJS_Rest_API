const jwt = require('jsonwebtoken');

 const verify =  function  (req, res, next) {
    const token = req.header('auth-token');

    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, 'shatishdesai');
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}

module.exports = verify;