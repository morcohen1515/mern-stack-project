const router = require('express').Router();
let Cost = require('../models/cost.model');

// this would verify te user's token from header
const verifyToken = require('../middleware/verifytoken').verifyToken;

//this route will return costs of the specific user
router.route('/').get( verifyToken, async (req, res) => {
    const decodeToken = req.userid;

    //find costs by the given decoded token
    await Cost.find({"userid": decodeToken})
    .then(costs => {
        res.json(costs);
    })
    .catch(err => res.status(400).json('Error:' + err));

});

//this endpoint will add a new cost for the specific user in the DB
router.route('/add').post( verifyToken, async (req, res) => {

    const category = req.body.category;
    const title = req.body.title;
    const price = Number(req.body.price);
    const description = req.body.description;
    const date = new Date();
    const userid = req.userid;
    
    const newCost = new Cost({ 
        category,
        title,
        price,
        description,
        date,
        userid
    });

     await newCost.save()
    .then(() => res.status(201).json('Cost added!'))
    .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;