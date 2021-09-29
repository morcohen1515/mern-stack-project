const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// this would verify te user's token from header
const verifyToken = require('../middleware/verifytoken').verifyToken;

// this endpoint returns the requested user in order to customize personal info (costs)
router.route('/getuser').get(verifyToken, async(req, res) => {

    const userid = req.userid._id;

    // find User in DB
    await User.findOne({"_id": userid}, {password:0})
    .lean()
    .then(user => {  
        res.json(user);
    })
    .catch(err => res.status(400).json('User Not Found:' + err)
    );
});

// this endpoint serves as a login service
router.route('/login').post( async (req, res) => {

    const {username, password} = req.body;

    if(!username || typeof username !== 'string' || !password || typeof password !== 'string'){
        return res.json({ formError });
    }

    //username and password authentication
    await User.findOne({username})
        .lean()
        .then(user => {   

            if(user.password !== password) {

                res.status(401).json({})

            } else {

                let token = jwt.sign(
                    {_id: user._id},
                    process.env.DB_SECRET,
                    {expiresIn: "60mins"}
                    )
                res.json({token: token});

            }
        })
        .catch(err => res.status(400).json({}));
});

// this endpoint provides a way for user to register the system
router.route('/register').post( async (req, res) => {
    
    const {username, password, bday, maritalstatus} = req.body;

    // fields validation
    if(!username || typeof username !== 'string' || !password || typeof password !== 'string' ||
       !bday || typeof bday !== 'string' || !maritalstatus || typeof maritalstatus !== 'string')
    {
        return res.json(res.status(400).json('Error:' + err));
    }

    // creating a new user and saving it in the DB
    const newUser = new User({username, password, bday, maritalstatus});

    await newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;