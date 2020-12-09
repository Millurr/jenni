const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const inventorySchema = new Schema({
    item: { type: String, required: true},
    description: { type: String, required: true },
    count: { type: Number, required: true },
    price: { type: Number, require: true},
    imageName: { type: String, required: true },
    imagePath: { type: String, required: true },
}, {
    timestamps: true,
});

const Inventory = mongoose.model('Inventory', inventorySchema);

module.exports = Inventory;