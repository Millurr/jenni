const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const locationSchema = new Schema({
    location: { type: String, required: true},
    show: {type: Boolean, required: true},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    inventory: { type: Array, require: false},
    //imageName: { type: String, required: true },
    //imagePath: { type: String, required: true },
}, {
    timestamps: true,
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;