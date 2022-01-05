const jwt = require('jsonwebtoken');
require('dotenv').config();
// const config = process.env;

const verifytoken = (req, res, next)=> {

    const token = req.body.token || req.query.token || req.headers["x-access-token"];
    console.log(req.user);

    if(!token) {
        return res.status(403).send('A token is required for authentication');
    }
    try{
      
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        console.log(decoded);
        req.user = decoded
        console.log(req.user);
 

    } catch(error){
        return res.status(401).send('Invalid token');
    }
    return next();
}

module.exports = verifytoken;