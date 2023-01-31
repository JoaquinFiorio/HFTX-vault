const jwt = require('jsonwebtoken');


const createToken = ({user}) => {

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 30*24*60*60 // expires in 30 days
    });
    return token;
}

const verifyToken = (req, res, next) => {

    const {authorization} = req.headers;
    if (!authorization) {
        console.log('No auth provided');
        return res.status(401).send({success: false, message: 'No auth provided'});
    }
    const token = authorization.split(' ')[1];
 
    if (!token) {
        console.log('No token provided');
        return res.status(401).send({success: false, message: 'No token provided'});
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log('Failed to authenticate token');
            return res.status(401).send({success: false, message: 'Failed to authenticate token'});
        }

        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    createToken,
    verifyToken
}
