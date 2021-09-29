const jwt = require('jsonwebtoken');

// this cerifies the token for authentication
exports.verifyToken = (req, res, next) => {

    let token = req.header('Authorization');

    if(!token){
        res.status(401).json({msg:'you must need token.'});
    }

    try{
        let decodeToken = jwt.verify(token, process.env.DB_SECRET);
        req.userid = decodeToken;
        next();
    } catch(err) {
        console.log(err);
        res.status(401).json({msg:"WRONG_TOKEN"})
    }
}