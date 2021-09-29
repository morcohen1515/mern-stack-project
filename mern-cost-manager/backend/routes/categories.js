const router = require('express').Router();
let Cost = require('../models/cost.model');

// this would verify te user's token from header
const verifyToken = require('../middleware/verifytoken').verifyToken;

router.route('/').get( verifyToken, async (req, res) => {

    const decodeToken = req.userid._id;
    const categories = [];
    const costs = await Cost.find({"userid": decodeToken});

    costs.map(cost => {
        categories.push(cost.category);
    });

    // remove duolicates from categories
    const categoriesWithoutDuplicates = categories.filter((value, index) => categories.indexOf(value) === index);
    
    res.json(categoriesWithoutDuplicates);

});

module.exports = router;