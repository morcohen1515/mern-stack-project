const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const costSchema = new Schema({
    category: { type: String, required: true},
    title: { type: String, required: true},
    price: { type: Number, required: true},
    description: { type: String, required: true},
    date: {type: Date, required: true},
    userid: { type: String, required: true},
 }, {
        timestamps: true,
});

const Cost = mongoose.model('Cost', costSchema);

module.exports = Cost;